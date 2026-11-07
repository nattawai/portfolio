import { useTranslation } from 'react-i18next'
import { GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons'

// รูปโปรไฟล์: วางไฟล์ที่ public/profile.webp แล้วเปลี่ยนเป็น true
const HAS_PHOTO = false

export function Hero() {
  const { t } = useTranslation()
  const email = t('contact.email')
  const github = t('contact.github', { returnObjects: true }) as string[]

  const social = 'grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink'

  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-8 pt-12 sm:flex-row sm:items-center sm:gap-10 sm:px-8 md:pt-20">
        <div className="size-28 shrink-0 overflow-hidden rounded-[1.75rem] bg-surface shadow-soft sm:size-36">
          {HAS_PHOTO ? (
            <img src="/profile.webp" alt={t('hero.photoAlt')} className="size-full object-cover grayscale" />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-sage/45 to-clay/35">
              <span aria-hidden className="font-heading text-4xl font-extrabold text-ink/80 sm:text-5xl">NW</span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-ink-soft">{t('hero.greeting')}</p>
          <h1
            id="hero-title"
            className="font-heading mt-1 text-[clamp(2rem,6.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight [html:lang(th)_&]:leading-[1.2]"
          >
            <span className="block">{t('hero.firstName')}</span>
            <span className="block text-ink-soft">{t('hero.lastName')}</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-sage-ink sm:text-xl">{t('hero.role')}</p>
          <p className="text-ink-soft">{t('hero.focus')}</p>

          <div className="mt-5 flex flex-wrap items-center gap-1">
            <a href={github[1] ?? github[0]} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={social}>
              <GitHubIcon />
            </a>
            <a href={t('contact.linkedin')} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={social}>
              <LinkedInIcon />
            </a>
            <a href={`mailto:${email}`} aria-label={t('contact.emailLabel')} className={social}>
              <MailIcon />
            </a>
            <a href="#projects" className="ml-2 rounded-full bg-clay px-5 py-2 text-sm font-bold text-on-clay shadow-soft transition-transform hover:-translate-y-0.5">
              {t('hero.ctaProjects')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
