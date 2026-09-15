import { mkdir, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const API_URL = 'https://www.worldcubeassociation.org/api/v0/competition_index'
const WCA_URL = 'https://www.worldcubeassociation.org/competitions/'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(root, 'public/data/africa.json')

function isCompetition(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.start_date === 'string' &&
    typeof value.end_date === 'string' &&
    typeof value.city === 'string' &&
    typeof value.country_iso2 === 'string'
  )
}

function nextPage(linkHeader) {
  if (!linkHeader) return null

  for (const link of linkHeader.split(',')) {
    const match = link.match(/<([^>]+)>;\s*rel="next"/)
    if (match) return match[1]
  }

  return null
}

async function fetchCompetitions() {
  const initialUrl = new URL(API_URL)
  initialUrl.searchParams.set('continent', '_Africa')
  initialUrl.searchParams.set('include_cancelled', 'false')
  initialUrl.searchParams.set('sort', 'start_date')
  initialUrl.searchParams.set('per_page', '100')

  const competitions = []
  let url = initialUrl.toString()

  while (url) {
    console.log(`Fetching ${url}`)
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`WCA API returned ${response.status} ${response.statusText}`)
    }

    const page = await response.json()
    if (!Array.isArray(page) || !page.every(isCompetition)) {
      throw new Error('WCA API returned an unexpected competition payload')
    }

    competitions.push(...page)
    url = nextPage(response.headers.get('link'))
  }

  if (competitions.length === 0) {
    throw new Error('WCA API returned no African competitions; refusing to publish an empty snapshot')
  }

  return competitions
}

const fetchedCompetitions = await fetchCompetitions()
const allCompetitions = [...new Map(
  fetchedCompetitions.map((competition) => [competition.id, competition]),
).values()]

if (allCompetitions.length !== fetchedCompetitions.length) {
  console.log(`Removed ${fetchedCompetitions.length - allCompetitions.length} duplicate competition records`)
}
const today = new Date().toISOString().slice(0, 10)
const byCountry = new Map()

for (const competition of allCompetitions) {
  const code = competition.country_iso2.toUpperCase()
  const current = byCountry.get(code) ?? {
    code,
    competitionCount: 0,
    upcomingCount: 0,
  }

  current.competitionCount += 1
  if (competition.end_date >= today) current.upcomingCount += 1
  byCountry.set(code, current)
}

function toSnapshotCompetition(competition) {
  return {
    id: competition.id,
    name: competition.name,
    startDate: competition.start_date,
    endDate: competition.end_date,
    city: competition.city,
    countryCode: competition.country_iso2.toUpperCase(),
    url: `${WCA_URL}${encodeURIComponent(competition.id)}`,
  }
}

const upcomingCompetitions = allCompetitions
  .filter((competition) => competition.end_date >= today)
  .map(toSnapshotCompetition)
  .sort((left, right) => left.startDate.localeCompare(right.startDate))

const pastCompetitions = allCompetitions
  .filter((competition) => competition.end_date < today)
  .map(toSnapshotCompetition)
  .sort((left, right) => right.startDate.localeCompare(left.startDate))

const snapshot = {
  generatedAt: new Date().toISOString(),
  source: API_URL,
  totalCompetitions: allCompetitions.length,
  countries: [...byCountry.values()].sort((left, right) => left.code.localeCompare(right.code)),
  upcomingCompetitions,
  pastCompetitions,
}

await mkdir(dirname(outputPath), { recursive: true })
const temporaryPath = `${outputPath}.tmp`
await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`)
await rename(temporaryPath, outputPath)

console.log(`Wrote ${upcomingCompetitions.length} upcoming and ${pastCompetitions.length} past competitions to ${outputPath}`)
