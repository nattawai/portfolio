import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import th from './th.json'
import en from './en.json'

export const LANGS = ['th', 'en'] as const
export type Lang = (typeof LANGS)[number]
const KEY = 'lang'
const isBrowser = typeof window !== 'undefined'

/** ภาษาผูกกับ URL: `/` = อังกฤษ, `/th/` = ไทย (HTML ของทั้งสองหน้า prerender ไว้ตอน build) */
export const pathFor = (l: Lang) => (l === 'th' ? '/th/' : '/')
export const langFromPath = (p: string): Lang => (p.startsWith('/th') ? 'th' : 'en')

i18n.use(initReactI18next).init({
  resources: { th: { translation: th }, en: { translation: en } },
  lng: isBrowser ? langFromPath(location.pathname) : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

// ผู้ชมกดสลับภาษา → จำไว้ + เปลี่ยน URL ให้ตรง (ไม่โหลดหน้าใหม่)
if (isBrowser) {
  i18n.on('languageChanged', (lng) => {
    const l = lng as Lang
    document.documentElement.lang = l
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage อาจถูกปิด */
    }
    if (langFromPath(location.pathname) !== l) {
      history.replaceState(null, '', pathFor(l) + location.search + location.hash)
    }
    document.title = i18n.t('meta.title')
  })
}

export default i18n
