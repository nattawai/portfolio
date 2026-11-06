import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import th from './th.json'
import en from './en.json'

export const LANGS = ['th', 'en'] as const
export type Lang = (typeof LANGS)[number]
const KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'th' || saved === 'en') return saved
  } catch {
    /* storage อาจถูกปิด */
  }
  return navigator.language.startsWith('th') ? 'th' : 'en'
}

i18n.use(initReactI18next).init({
  resources: { th: { translation: th }, en: { translation: en } },
  lng: initialLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

function syncHtmlLang(lng: string) {
  document.documentElement.lang = lng
  try {
    localStorage.setItem(KEY, lng)
  } catch {
    /* ignore */
  }
}
syncHtmlLang(i18n.language)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
