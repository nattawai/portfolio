import { Trans, useTranslation } from 'react-i18next'
import { Section } from '../components/Section'

type Stat = { value: string; label: string }

// <hl>คำ</hl> ในไฟล์แปล → คำเน้นสีเสจ
const HL = { hl: <strong className="hl" /> }

export function About() {
  const { t } = useTranslation()
  const body = t('about.body', { returnObjects: true }) as string[]
  const stats = t('about.stats', { returnObjects: true }) as Stat[]

  return (
    <Section id="about" label={t('about.title')}>
      <p className="font-heading text-[clamp(1.375rem,3vw,1.75rem)] font-bold leading-snug [html:lang(th)_&]:leading-[1.45]">
        {t('about.lead')}
      </p>

      {body.map((_, i) => (
        <p data-reveal key={i} className="mt-5 text-lg leading-relaxed text-ink-soft">
          <Trans i18nKey={`about.body.${i}`} components={HL} />
        </p>
      ))}

      <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <div data-reveal key={s.label} className="flex flex-col-reverse justify-end rounded-card bg-surface p-4 sm:p-5">
            <dt className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{s.label}</dt>
            <dd data-count className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div data-reveal className="mt-10 rounded-r-card border-l-2 border-sage-ink bg-surface/60 py-5 pl-5 pr-4">
        <p className="font-mono text-xs font-medium uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.16em]">
          {t('about.lookingTitle')}
        </p>
        <p className="mt-2 leading-relaxed">
          <Trans i18nKey="about.lookingBody" components={HL} />
        </p>
      </div>
    </Section>
  )
}
