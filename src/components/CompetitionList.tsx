import { useTranslation } from 'react-i18next'
import { countryName, formatDateRange } from '../lib/format.ts'
import type { Competition, CompetitionView, RegionalOrganization } from '../types.ts'

interface CompetitionListProps {
  competitions: Competition[]
  view: CompetitionView
  selectedCountry: string | null
  regionalOrganization?: RegionalOrganization
  loading: boolean
  error: boolean
  onViewChange: (view: CompetitionView) => void
  onClear: () => void
}

export function CompetitionList({
  competitions,
  view,
  selectedCountry,
  regionalOrganization,
  loading,
  error,
  onViewChange,
  onClear,
}: CompetitionListProps) {
  const { i18n, t } = useTranslation()
  const language = i18n.resolvedLanguage ?? 'en'

  return (
    <section className="competitions-panel" aria-labelledby="competitions-title">
      <header className="competitions-header">
        <div>
          <span className="eyebrow">
            {t(view === 'upcoming' ? 'competitions' : 'pastCompetitions')}
          </span>
          <h1 id="competitions-title">
            {selectedCountry ? countryName(selectedCountry, language) : t('africa')}
          </h1>
          {regionalOrganization && (
            <a
              className="regional-organization"
              href={regionalOrganization.website}
              target="_blank"
              rel="noreferrer"
              aria-label={t('openRegionalOrganization', { name: regionalOrganization.name })}
            >
              {regionalOrganization.logoUrl && (
                <span className="regional-organization__logo" aria-hidden="true">
                  <img
                    src={regionalOrganization.logoUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.parentElement?.setAttribute('hidden', '')
                    }}
                  />
                </span>
              )}
              <span className="regional-organization__text">
                <span>{t('regionalOrganization')}</span>
                <strong dir="auto">{regionalOrganization.name}</strong>
              </span>
              <span className="regional-organization__arrow" aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div className="competitions-header__actions">
          <div className="view-toggle" role="group" aria-label={t('competitions')}>
            {(['upcoming', 'past'] as const).map((option) => (
              <button
                className={view === option ? 'is-active' : ''}
                type="button"
                aria-pressed={view === option}
                onClick={() => onViewChange(option)}
                key={option}
              >
                {t(option)}
              </button>
            ))}
          </div>
          {selectedCountry && (
            <button className="clear-filter" type="button" onClick={onClear}>
              {t('clearFilter')}
            </button>
          )}
        </div>
      </header>

      <div className="competition-list">
        {loading && <p className="list-message">{t('loading')}</p>}
        {error && <p className="list-message list-message--error">{t('loadError')}</p>}
        {!loading && !error && competitions.length === 0 && (
          <p className="list-message">{t(view === 'upcoming' ? 'empty' : 'emptyPast')}</p>
        )}

        {competitions.map((competition, index) => (
          <a
            className="competition-card"
            href={competition.url}
            target="_blank"
            rel="noreferrer"
            aria-label={t('openCompetition', { name: competition.name })}
            style={{ '--card-index': Math.min(index, 12) } as React.CSSProperties}
            key={competition.id}
          >
            <span className="competition-card__date">
              {formatDateRange(competition.startDate, competition.endDate, language)}
            </span>
            <strong dir="auto">{competition.name}</strong>
            <span className="competition-card__location" dir="auto">
              {competition.city} · {countryName(competition.countryCode, language)}
            </span>
            <span className="competition-card__arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
