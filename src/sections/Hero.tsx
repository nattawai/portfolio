import { useTranslation } from 'react-i18next'

// รูปโปรไฟล์: วางไฟล์ที่ public/profile.webp แล้วเปลี่ยนเป็น true
const HAS_PHOTO = false

export function Hero() {
  const { t } = useTranslation()
  const domains = t('hero.domains', { returnObjects: true }) as string[]

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* blob พื้นหลัง — ขั้น Motion จะทำให้ลอยตาม scroll ผ่าน data-speed */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-speed="0.3" className="absolute -left-24 top-10 size-72 rounded-full bg-sage/35 blur-3xl sm:size-96" />
        <div data-speed="0.6" className="absolute -right-20 top-48 size-64 rounded-full bg-clay/30 blur-3xl sm:size-80" />
        <div data-speed="0.15" className="absolute bottom-0 left-1/3 size-56 rounded-full bg-sage/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr] md:pt-28">
        <div>
          <p className="text-ink-soft">{t('hero.greeting')}</p>
          <h1
            id="hero-title"
            className="mt-2 text-[clamp(2rem,7.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            <span className="block">{t('hero.firstName')}</span>
            <span className="block text-ink-soft">{t('hero.lastName')}</span>
          </h1>

          <p className="mt-6 text-xl font-semibold text-sage-ink sm:text-2xl">{t('hero.role')}</p>
          <p className="mt-1 text-ink-soft">{t('hero.focus')}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed">{t('hero.tagline')}</p>

          <ul aria-label={t('hero.domainsLabel')} className="mt-6 flex flex-wrap gap-2">
            {domains.map((d) => (
              <li key={d} className="rounded-full border border-ink/10 bg-surface/70 px-3 py-1 text-sm text-ink-soft">
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-clay px-6 py-3 font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5">
              {t('hero.ctaProjects')}
            </a>
            <a href="#contact" className="rounded-full border border-ink/20 px-6 py-3 font-semibold transition-colors hover:bg-surface">
              {t('hero.ctaContact')}
            </a>
          </div>
        </div>

        <div data-speed="0.15" className="mx-auto w-56 sm:w-72 md:w-full md:max-w-sm">
          <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-surface shadow-soft">
            {HAS_PHOTO ? (
              <img src="/profile.webp" alt={t('hero.photoAlt')} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-sage/40 to-clay/40">
                <span aria-hidden className="text-7xl font-extrabold text-ink/70">NW</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
