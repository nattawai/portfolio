import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { ArrowUpRight, MailIcon } from '../components/Icons'

// ไม่ใส่ data-reveal ใน Contact: อยู่ท้ายหน้า trigger ใกล้ขอบล่างสุด → ค้างแล้วเด้ง (จอเตี้ยไม่ขึ้นเลย)
// Resume: วางไฟล์ที่ public/resume.pdf แล้วเปลี่ยนเป็น true
const HAS_RESUME = false

export function Contact() {
  const { t } = useTranslation()
  const email = t('contact.email')
  const github = t('contact.github', { returnObjects: true }) as string[]

  const link = 'inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface'

  return (
    <>
      <Section id="contact" label={t('contact.title')}>
        <p className="text-[clamp(1.75rem,4.5vw,2.5rem)] font-extrabold leading-tight [html:lang(th)_&]:leading-[1.25]">
          {t('contact.lead')}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t('contact.body')}</p>

        <a
          href={`mailto:${email}`}
          className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-clay px-6 py-3 font-bold text-on-clay shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <MailIcon className="size-5 shrink-0" />
          <span className="break-all">{email}</span>
        </a>

        <div className="mt-5 flex flex-wrap gap-2">
          <a href={t('contact.linkedin')} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn <ArrowUpRight />
          </a>
          {github.map((g) => (
            <a key={g} href={g} target="_blank" rel="noopener noreferrer" className={link}>
              GitHub · {g.split('/').pop()} <ArrowUpRight />
            </a>
          ))}
          {HAS_RESUME && (
            <a href="/resume.pdf" download className={link}>{t('contact.resume')} ⬇</a>
          )}
        </div>
      </Section>

      <footer className="mx-auto max-w-5xl border-t border-ink/10 px-4 py-6 text-center text-sm text-ink-soft sm:px-8">
        © {new Date().getFullYear()} · {t('contact.footer')}
      </footer>
    </>
  )
}
