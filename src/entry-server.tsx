// ใช้ตอน build เท่านั้น (scripts/prerender.mjs): เรนเดอร์ทั้งหน้าเป็น HTML ให้ bot/SEO อ่านได้โดยไม่ต้องรัน JS
import { renderToString } from 'react-dom/server'
import i18n, { type Lang } from './i18n'
import App from './App'
import { NotFound } from './NotFound'

export async function render(lang: Lang) {
  await i18n.changeLanguage(lang)
  return {
    html: renderToString(<App />),
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
  }
}

export async function render404() {
  await i18n.changeLanguage('en')
  return { html: renderToString(<NotFound />), title: `${i18n.t('notFound.title')} — ${i18n.t('nav.brand')}` }
}
