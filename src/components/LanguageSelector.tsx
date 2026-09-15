import { useTranslation } from 'react-i18next'
import { supportedLanguages, type LanguageCode } from '../i18n.ts'

const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  pt: 'Português',
  sw: 'Kiswahili',
}

export function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const current = (i18n.resolvedLanguage?.split('-')[0] ?? 'en') as LanguageCode

  function select(language: LanguageCode) {
    void i18n.changeLanguage(language)
    localStorage.setItem('african-cubing-language', language)
  }

  return (
    <div className="language-select">
      <select
        value={current}
        aria-label={t('language')}
        onChange={(event) => select(event.target.value as LanguageCode)}
      >
        {supportedLanguages.map((language) => (
          <option value={language} dir="auto" key={language}>
            {languageNames[language]}
          </option>
        ))}
      </select>
    </div>
  )
}
