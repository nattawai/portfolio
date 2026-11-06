import { useTranslation } from 'react-i18next'

type Tag = 'ai' | 'live' | 'oss' | 'enterprise'
type Project = {
  id: string
  tag: Tag
  title: string
  desc: string
  stack: string[]
  links: { demo?: string; code?: string }
}

// สีหัวการ์ดตามประเภท — ใช้ token เท่านั้น
const COVER: Record<Tag, string> = {
  ai: 'from-sage/50 to-clay/40',
  live: 'from-clay/45 to-sage/25',
  oss: 'from-sage/35 to-surface',
  enterprise: 'from-ink/15 to-sage/25',
}

export function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true }) as Project[]

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <h2 id="projects-title" className="text-sm font-semibold uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.2em]">
          {t('projects.title')}
        </h2>
        <p data-reveal className="mt-4 max-w-2xl text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight">
          {t('projects.lead')}
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.id} data-reveal data-tilt className="flex flex-col overflow-hidden rounded-card bg-surface shadow-soft">
              <div aria-hidden className={`flex h-28 items-end bg-gradient-to-br p-5 ${COVER[p.tag]}`}>
                <span className="text-4xl font-extrabold text-ink/25">{p.title.slice(0, 2)}</span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-bg px-2.5 py-0.5 text-xs font-semibold text-sage-ink">
                  {t(`projects.tags.${p.tag}`)}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.desc}</p>

                <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-ink/10 px-2 py-0.5 text-xs text-ink-soft">{s}</li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-4 text-sm font-semibold">
                  {p.links.demo && (
                    <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="text-sage-ink underline-offset-4 hover:underline">
                      {t('projects.demo')} ↗
                    </a>
                  )}
                  {p.links.code && (
                    <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="text-sage-ink underline-offset-4 hover:underline">
                      {t('projects.code')} ↗
                    </a>
                  )}
                  {!p.links.demo && !p.links.code && p.tag === 'enterprise' && (
                    <span className="text-xs font-normal text-ink-soft">{t('projects.private')}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
