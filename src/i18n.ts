import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      language: 'Language',
      africa: 'Africa',
      map: 'Competition map of Africa',
      allCountries: 'All countries',
      hosted: 'Hosted',
      upcoming: 'Upcoming',
      past: 'Past',
      noCompetitions: 'No WCA competitions yet',
      competitions: 'Upcoming competitions',
      pastCompetitions: 'Past competitions',
      competitionCount_one: '{{count}} competition',
      competitionCount_other: '{{count}} competitions',
      clearFilter: 'Show all',
      loading: 'Loading competitions…',
      loadError: 'Competition data unavailable',
      empty: 'No upcoming competitions',
      emptyPast: 'No past competitions',
      openCompetition: 'Open {{name}} on the WCA website',
      regionalOrganization: 'Regional organisation',
      openRegionalOrganization: 'Visit {{name}}',
      updated: 'Updated {{date}}',
      wcaData: 'WCA data',
      unofficial: 'Unofficial',
    },
  },
  fr: {
    translation: {
      language: 'Langue',
      africa: 'Afrique',
      map: "Carte des compétitions d'Afrique",
      allCountries: 'Tous les pays',
      hosted: 'A déjà accueilli',
      upcoming: 'À venir',
      past: 'Passées',
      noCompetitions: 'Aucune compétition WCA',
      competitions: 'Compétitions à venir',
      pastCompetitions: 'Compétitions passées',
      competitionCount_one: '{{count}} compétition',
      competitionCount_other: '{{count}} compétitions',
      clearFilter: 'Tout afficher',
      loading: 'Chargement des compétitions…',
      loadError: 'Données indisponibles',
      empty: 'Aucune compétition à venir',
      emptyPast: 'Aucune compétition passée',
      openCompetition: 'Ouvrir {{name}} sur le site de la WCA',
      regionalOrganization: 'Organisation régionale',
      openRegionalOrganization: 'Visiter {{name}}',
      updated: 'Mis à jour le {{date}}',
      wcaData: 'Données WCA',
      unofficial: 'Non officiel',
    },
  },
  ar: {
    translation: {
      language: 'اللغة',
      africa: 'أفريقيا',
      map: 'خريطة مسابقات أفريقيا',
      allCountries: 'كل البلدان',
      hosted: 'استضافت مسابقات',
      upcoming: 'قادمة',
      past: 'سابقة',
      noCompetitions: 'لا توجد مسابقات WCA بعد',
      competitions: 'المسابقات القادمة',
      pastCompetitions: 'المسابقات السابقة',
      competitionCount_zero: 'لا مسابقات',
      competitionCount_one: 'مسابقة واحدة',
      competitionCount_two: 'مسابقتان',
      competitionCount_few: '{{count}} مسابقات',
      competitionCount_many: '{{count}} مسابقة',
      competitionCount_other: '{{count}} مسابقة',
      clearFilter: 'عرض الكل',
      loading: 'جارٍ تحميل المسابقات…',
      loadError: 'بيانات المسابقات غير متاحة',
      empty: 'لا توجد مسابقات قادمة',
      emptyPast: 'لا توجد مسابقات سابقة',
      openCompetition: 'افتح {{name}} على موقع WCA',
      regionalOrganization: 'المنظمة الإقليمية',
      openRegionalOrganization: 'زيارة {{name}}',
      updated: 'حُدّث في {{date}}',
      wcaData: 'بيانات WCA',
      unofficial: 'غير رسمي',
    },
  },
  pt: {
    translation: {
      language: 'Idioma',
      africa: 'África',
      map: 'Mapa de competições em África',
      allCountries: 'Todos os países',
      hosted: 'Já acolheu',
      upcoming: 'Próximas',
      past: 'Anteriores',
      noCompetitions: 'Ainda sem competições WCA',
      competitions: 'Próximas competições',
      pastCompetitions: 'Competições anteriores',
      competitionCount_one: '{{count}} competição',
      competitionCount_other: '{{count}} competições',
      clearFilter: 'Mostrar tudo',
      loading: 'A carregar competições…',
      loadError: 'Dados das competições indisponíveis',
      empty: 'Nenhuma competição próxima',
      emptyPast: 'Nenhuma competição anterior',
      openCompetition: 'Abrir {{name}} no site da WCA',
      regionalOrganization: 'Organização regional',
      openRegionalOrganization: 'Visitar {{name}}',
      updated: 'Atualizado em {{date}}',
      wcaData: 'Dados da WCA',
      unofficial: 'Não oficial',
    },
  },
  sw: {
    translation: {
      language: 'Lugha',
      africa: 'Afrika',
      map: 'Ramani ya mashindano barani Afrika',
      allCountries: 'Nchi zote',
      hosted: 'Yamefanyika',
      upcoming: 'Yajayo',
      past: 'Yaliyopita',
      noCompetitions: 'Bado hakuna mashindano ya WCA',
      competitions: 'Mashindano yajayo',
      pastCompetitions: 'Mashindano yaliyopita',
      competitionCount_one: 'shindano {{count}}',
      competitionCount_other: 'mashindano {{count}}',
      clearFilter: 'Onyesha zote',
      loading: 'Inapakia mashindano…',
      loadError: 'Data ya mashindano haipatikani',
      empty: 'Hakuna mashindano yajayo',
      emptyPast: 'Hakuna mashindano yaliyopita',
      openCompetition: 'Fungua {{name}} kwenye tovuti ya WCA',
      regionalOrganization: 'Shirika la kikanda',
      openRegionalOrganization: 'Tembelea {{name}}',
      updated: 'Imesasishwa {{date}}',
      wcaData: 'Data ya WCA',
      unofficial: 'Isiyo rasmi',
    },
  },
} as const

export const supportedLanguages = ['en', 'fr', 'ar', 'pt', 'sw'] as const
export type LanguageCode = (typeof supportedLanguages)[number]

function languageCode(value: string): LanguageCode | undefined {
  const code = value.toLowerCase().split('-')[0]
  return supportedLanguages.find((language) => language === code)
}

function initialLanguage() {
  const saved = localStorage.getItem('african-cubing-language')
  const savedLanguage = saved ? languageCode(saved) : undefined
  if (savedLanguage) return savedLanguage

  for (const language of navigator.languages) {
    const supported = languageCode(language)
    if (supported) return supported
  }

  return 'en'
}

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage(),
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
})

export default i18n
