import { useTranslation } from 'react-i18next'

// Resume: วางไฟล์ที่ public/resume.pdf แล้วเปลี่ยนเป็น true
const HAS_RESUME = false

export function Contact() {
  const { t } = useTranslation()
  const email = t('contact.email')
  const github = t('contact.github', { returnObjects: true }) as string[]

  const link = 'rounded-full border border-ink/15 bg-surface px-5 py-2.5 font-semibold shadow-soft transition-transform hover:-translate-y-0.5'

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      {/* blob ทั้งสองมาบรรจบกันตอนจบเรื่อง (ขั้น Motion) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-speed="0.5" className="absolute left-1/4 top-1/4 size-72 rounded-full bg-sage/30 blur-3xl" />
        <div data-speed="0.2" className="absolute right-1/4 top-1/3 size-64 rounded-full bg-clay/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-8">
        <h2 id="contact-title" className="text-sm font-semibold uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.2em]">
          {t('contact.title')}
        </h2>
        <p data-reveal className="mt-4 text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-tight">{t('contact.lead')}</p>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">{t('contact.body')}</p>

        <a data-reveal href={`mailto:${email}`} className="mt-10 inline-block rounded-full bg-clay px-8 py-4 text-lg font-bold text-ink shadow-soft transition-transform hover:-translate-y-0.5">
          {t('contact.emailLabel')} · <span className="break-all">{email}</span>
        </a>

        <div data-reveal className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={t('contact.linkedin')} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn ↗</a>
          {github.map((g) => (
            <a key={g} href={g} target="_blank" rel="noopener noreferrer" className={link}>
              GitHub · {g.split('/').pop()} ↗
            </a>
          ))}
          {HAS_RESUME && (
            <a href="/resume.pdf" download className={link}>{t('contact.resume')} ⬇</a>
          )}
        </div>
      </div>

      <footer className="border-t border-ink/10 px-4 py-6 text-center text-sm text-ink-soft">
        © {new Date().getFullYear()} · {t('contact.footer')}
      </footer>
    </section>
  )
}
