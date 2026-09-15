const FALLBACK_LOCALE = 'en'

const countryNameOverrides: Record<string, Record<string, string>> = {
  en: {
    CD: 'Democratic Republic of the Congo',
    CG: 'Congo',
  },
  fr: {
    CD: 'République démocratique du Congo',
    CG: 'Congo',
  },
  ar: {
    CD: 'جمهورية الكونغو الديمقراطية',
    CG: 'الكونغو',
  },
  pt: {
    CD: 'República Democrática do Congo',
    CG: 'Congo',
  },
  sw: {
    CD: 'Jamhuri ya Kidemokrasia ya Kongo',
    CG: 'Kongo',
  },
}

function asUtcDate(value: string) {
  return new Date(`${value}T12:00:00Z`)
}

export function formatDateRange(start: string, end: string, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale || FALLBACK_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const startDate = asUtcDate(start)
  const endDate = asUtcDate(end)

  return start === end ? formatter.format(startDate) : formatter.formatRange(startDate, endDate)
}

export function formatUpdatedDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale || FALLBACK_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function countryName(code: string, locale: string) {
  const resolvedLocale = locale || FALLBACK_LOCALE
  const language = resolvedLocale.toLowerCase().split('-')[0]
  const countryCode = code.toUpperCase()

  return (
    countryNameOverrides[language]?.[countryCode] ??
    new Intl.DisplayNames([resolvedLocale], { type: 'region' }).of(countryCode) ??
    countryCode
  )
}
