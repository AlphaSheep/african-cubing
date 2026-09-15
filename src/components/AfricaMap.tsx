import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mapSvg from '../assets/africa-map.svg?raw'
import { countryName } from '../lib/format.ts'
import type { CountrySummary } from '../types.ts'

interface AfricaMapProps {
  countries: CountrySummary[]
  selectedCountry: string | null
  onSelectCountry: (countryCode: string | null) => void
}

const foregroundCountries: Partial<Record<string, string[]>> = {
  ZA: ['SZ', 'LS'],
  SN: ['GM'],
}

function countryElement(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<SVGElement>('[data-country-code]')
    : null
}

function bringToFront(element: SVGElement | null | undefined) {
  if (element?.parentElement?.lastElementChild !== element) {
    element?.parentElement?.append(element)
  }
}

export function AfricaMap({ countries, selectedCountry, onSelectCountry }: AfricaMapProps) {
  const { i18n, t } = useTranslation()
  const container = useRef<HTMLDivElement>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const language = i18n.resolvedLanguage ?? 'en'
  const stats = useMemo(
    () => new Map(countries.map((country) => [country.code, country])),
    [countries],
  )

  useEffect(() => {
    const elements = container.current?.querySelectorAll<SVGElement>('[data-country-code]') ?? []
    let selectedElement: SVGElement | undefined

    for (const element of elements) {
      const code = element.dataset.countryCode ?? ''
      const country = stats.get(code)
      const hosted = (country?.competitionCount ?? 0) > 0
      const upcoming = (country?.upcomingCount ?? 0) > 0
      const selected = code === selectedCountry

      element.classList.toggle('has-hosted', hosted)
      element.classList.toggle('has-upcoming', upcoming)
      element.classList.toggle('is-selected', selected)
      element.setAttribute('role', 'button')
      element.setAttribute('tabindex', '0')
      element.setAttribute('aria-pressed', String(selected))
      element.setAttribute(
        'aria-label',
        `${countryName(code, language)}, ${t('competitionCount', { count: country?.competitionCount ?? 0 })}`,
      )

      if (selected) selectedElement = element
    }

    if (selectedElement) {
      bringToFront(selectedElement)

      for (const code of foregroundCountries[selectedCountry ?? ''] ?? []) {
        bringToFront(
          container.current?.querySelector<SVGElement>(`[data-country-code="${code}"]`),
        )
      }
    }
  }, [countries, language, selectedCountry, stats, t])

  function select(target: EventTarget | null) {
    const code = countryElement(target)?.dataset.countryCode
    if (code) onSelectCountry(code === selectedCountry ? null : code)
  }

  const activeCountry = hoveredCountry ?? selectedCountry
  const activeStats = activeCountry ? stats.get(activeCountry) : undefined

  return (
    <section className="map-panel" aria-label={t('map')}>
      <div className="map-readout" aria-live="polite">
        <span className="map-readout__country">
          {activeCountry ? countryName(activeCountry, language) : t('allCountries')}
        </span>
        {activeCountry && (
          <span>{t('competitionCount', { count: activeStats?.competitionCount ?? 0 })}</span>
        )}
      </div>

      <div
        className="africa-map"
        ref={container}
        dangerouslySetInnerHTML={{ __html: mapSvg }}
        onMouseOver={(event) => {
          const element = countryElement(event.target)
          const code = element?.dataset.countryCode
          if (code) setHoveredCountry(code)
        }}
        onMouseLeave={() => setHoveredCountry(null)}
        onFocus={(event) => {
          const element = countryElement(event.target)
          const code = element?.dataset.countryCode
          if (code) setHoveredCountry(code)
        }}
        onBlur={() => setHoveredCountry(null)}
        onClick={(event) => select(event.target)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            const element = countryElement(event.target)
            if (element) {
              event.preventDefault()
              select(element)
            }
          }
        }}
      />

      <div className="map-legend" aria-hidden="true">
        <span><i className="legend-dot legend-dot--hosted" />{t('hosted')}</span>
        <span><i className="legend-dot legend-dot--upcoming" />{t('upcoming')}</span>
      </div>
    </section>
  )
}
