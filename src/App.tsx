import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AfricaMap } from './components/AfricaMap.tsx'
import { CompetitionList } from './components/CompetitionList.tsx'
import { LanguageSelector } from './components/LanguageSelector.tsx'
import { loadAfricaData } from './lib/data.ts'
import { formatUpdatedDate } from './lib/format.ts'
import type { AfricaData, CompetitionView } from './types.ts'

export default function App() {
  const { i18n, t } = useTranslation()
  const [data, setData] = useState<AfricaData | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [competitionView, setCompetitionView] = useState<CompetitionView>('upcoming')
  const [error, setError] = useState(false)
  const language = i18n.resolvedLanguage ?? 'en'

  useEffect(() => {
    const languageCode = language.split('-')[0]
    document.documentElement.lang = languageCode
    document.documentElement.dir = languageCode === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const controller = new AbortController()
    loadAfricaData(controller.signal)
      .then(setData)
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') return
        console.error(loadError)
        setError(true)
      })

    return () => controller.abort()
  }, [])

  const competitions = useMemo(() => {
    const all = data?.[competitionView === 'upcoming' ? 'upcomingCompetitions' : 'pastCompetitions'] ?? []
    const filtered = selectedCountry
      ? all.filter((competition) => competition.countryCode === selectedCountry)
      : all
    const seen = new Set<string>()

    return filtered.filter((competition) => {
      if (seen.has(competition.id)) return false
      seen.add(competition.id)
      return true
    })
  }, [competitionView, data, selectedCountry])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="./" aria-label="African Cubing">
          <span className="cube-mark" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span>African<br />Cubing</span>
        </a>
        <LanguageSelector />
      </header>

      <main className="dashboard">
        <AfricaMap
          countries={data?.countries ?? []}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
        <CompetitionList
          competitions={competitions}
          view={competitionView}
          selectedCountry={selectedCountry}
          loading={!data && !error}
          error={error}
          onViewChange={setCompetitionView}
          onClear={() => setSelectedCountry(null)}
        />
      </main>

      <footer className="site-footer">
        {data && <span>{t('updated', { date: formatUpdatedDate(data.generatedAt, language) })}</span>}
        <span>·</span>
        <a href="https://www.worldcubeassociation.org/" target="_blank" rel="noreferrer">
          {t('wcaData')}
        </a>
        <span>·</span>
        <span>{t('unofficial')}</span>
      </footer>
    </div>
  )
}
