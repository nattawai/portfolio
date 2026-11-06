import { useTranslation } from 'react-i18next'

type Stat = { value: string; label: string }

export function About() {
  const { t } = useTranslation()
  const body = t('about.body', { returnObjects: true }) as string[]
  const stats = t('about.stats', { returnObjects: true }) as Stat[]

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-speed="0.4" className="absolute -right-24 top-1/3 size-72 rounded-full bg-sage/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div>
          <h2 id="about-title" className="text-sm font-semibold uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.2em]">
            {t('about.title')}
          </h2>
          <p data-reveal className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">
            {t('about.lead')}
          </p>
        </div>

        <div>
          {body.map((p) => (
            <p data-reveal key={p} className="mb-5 text-lg leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}

          <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div data-reveal key={s.label} className="flex flex-col-reverse justify-end rounded-card bg-surface p-4 shadow-soft sm:p-6">
                <dt className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{s.label}</dt>
                <dd data-count className="text-3xl font-extrabold text-ink sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
