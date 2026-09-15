import type { AfricaData } from '../types.ts'

function isAfricaData(value: unknown): value is AfricaData {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<AfricaData>

  return (
    typeof data.generatedAt === 'string' &&
    typeof data.totalCompetitions === 'number' &&
    Array.isArray(data.countries) &&
    Array.isArray(data.upcomingCompetitions) &&
    Array.isArray(data.pastCompetitions)
  )
}

export async function loadAfricaData(signal?: AbortSignal) {
  const response = await fetch(`${import.meta.env.BASE_URL}data/africa.json`, { signal })
  if (!response.ok) throw new Error(`Data request failed with ${response.status}`)

  const data: unknown = await response.json()
  if (!isAfricaData(data)) throw new Error('Competition data has an unexpected shape')
  return data
}
