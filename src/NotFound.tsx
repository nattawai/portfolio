import { useTranslation } from 'react-i18next'
import { ThemeToggle } from './components/ThemeToggle'

/**
 * หน้า 404 (prerender เป็น dist/404.html — Cloudflare Pages ตอบ status 404 ให้ทุก URL ที่ไม่มี)
 * ไม่รู้ว่าผู้ชมใช้ภาษาไหน → แสดงไทยและอังกฤษคู่กัน
 */
export function NotFound() {
  const { t } = useTranslation()
  const both = (key: string) => [t(key, { lng: 'en' }), t(key, { lng: 'th' })]
  const [titleEn, titleTh] = both('notFound.title')
  const [bodyEn, bodyTh] = both('notFound.body')

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="/" className="font-bold">{t('nav.brand', { lng: 'en' })}</a>
        <ThemeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 pb-16 text-center">
        <img
          src="/404.webp"
          alt={t('notFound.imageAlt', { lng: 'en' })}
          width={240}
          height={240}
          className="size-48 rounded-full bg-[#fbfbfd] object-cover shadow-soft sm:size-60"
        />
        <p className="mt-8 font-mono text-sm text-sage-ink">404</p>
        <h1 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">{titleEn}</h1>
        <p lang="th" className="mt-1 text-xl font-semibold text-ink-soft">{titleTh}</p>
        <p className="mt-5 leading-relaxed text-ink-soft">{bodyEn}</p>
        <p lang="th" className="mt-1 leading-relaxed text-ink-soft">{bodyTh}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-bold">
          <a href="/" className="rounded-full bg-clay px-5 py-2 text-on-clay shadow-soft transition-transform hover:-translate-y-0.5">
            {t('notFound.homeEn', { lng: 'en' })}
          </a>
          <a href="/th/" lang="th" className="rounded-full bg-surface px-5 py-2 text-ink transition-transform hover:-translate-y-0.5">
            {t('notFound.homeTh', { lng: 'th' })}
          </a>
        </div>
      </main>
    </div>
  )
}
