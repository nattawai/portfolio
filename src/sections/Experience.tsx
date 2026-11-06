import { useTranslation } from 'react-i18next'

type SkillGroup = { group: string; items: string[] }
type Job = { years: string; role: string; company: string; points: string[] }
type Edu = { year: string; degree: string; school: string }

export function Experience() {
  const { t } = useTranslation()
  const skills = t('experience.skills', { returnObjects: true }) as SkillGroup[]
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[]
  const edu = t('experience.education', { returnObjects: true }) as Edu
  const other = t('experience.other', { returnObjects: true }) as Job & { title: string }

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-speed="0.35" className="absolute -left-24 top-1/2 size-80 rounded-full bg-clay/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <h2 id="experience-title" className="text-sm font-semibold uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.2em]">
          {t('experience.title')}
        </h2>
        <p data-reveal className="mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight">
          {t('experience.lead')}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Skills */}
          <div>
            <h3 className="text-lg font-bold">{t('experience.skillsTitle')}</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {skills.map((g) => (
                <div data-reveal key={g.group}>
                  <p className="text-sm font-semibold text-sage-ink">{g.group}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full bg-surface px-3 py-1 text-sm text-ink-soft shadow-soft">{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-bold">{t('experience.timelineTitle')}</h3>
            <ol className="relative mt-5 space-y-8 pl-7">
              <span data-line aria-hidden className="absolute left-[7px] top-2 bottom-2 w-0.5 origin-top rounded bg-sage/50" />
              {jobs.map((j) => (
                <li data-reveal key={j.years + j.company} className="relative">
                  <span aria-hidden className="absolute -left-7 top-1.5 size-4 rounded-full border-4 border-bg bg-clay" />
                  <p className="text-sm font-semibold text-sage-ink">{j.years}</p>
                  <p className="mt-1 text-lg font-bold">{j.role}</p>
                  <p className="text-ink-soft">{j.company}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft marker:text-sage">
                    {j.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </li>
              ))}
            </ol>

            {/* งานนอกสาย dev — แยกจาก timeline ให้ประวัติต่อเนื่องโดยไม่ปนกับงาน dev */}
            <div data-reveal className="mt-10 rounded-card border border-ink/10 p-5">
              <p className="text-sm font-semibold text-sage-ink">{other.title} · {other.years}</p>
              <p className="mt-1 font-bold">{other.role}</p>
              <p className="text-ink-soft">{other.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft marker:text-sage">
                {other.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>

            <div data-reveal className="mt-4 rounded-card bg-surface p-5 shadow-soft">
              <p className="text-sm font-semibold text-sage-ink">{t('experience.eduTitle')} · {edu.year}</p>
              <p className="mt-1 font-bold">{edu.degree}</p>
              <p className="text-ink-soft">{edu.school}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
