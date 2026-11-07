import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'

type Job = { years: string; role: string; company: string; points: string[] }
type Edu = { year: string; degree: string; school: string }

const sub = 'font-mono text-xs font-medium uppercase text-sage-ink [html:lang(en)_&]:tracking-[0.16em]'

export function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[]
  const edu = t('experience.education', { returnObjects: true }) as Edu[]
  const other = t('experience.other', { returnObjects: true }) as Job & { title: string }

  return (
    <Section id="experience" label={t('experience.title')}>
      <ol className="relative space-y-10 pl-8">
        <span data-line aria-hidden className="absolute left-[7px] top-2 bottom-2 w-0.5 origin-top rounded bg-sage/45" />
        {jobs.map((j, i) => (
          <li data-reveal key={j.years + j.company} className="relative">
            <span
              aria-hidden
              className={`absolute -left-8 top-1 size-4 rounded-full border-4 border-bg ${i === 0 ? 'bg-clay' : 'bg-sage'}`}
            />
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-sm text-ink-soft">{j.years}</p>
              {i === 0 && (
                <span className="rounded-full bg-sage-ink px-2 py-0.5 text-xs font-bold text-bg">{t('experience.current')}</span>
              )}
            </div>
            <p className="font-heading mt-1 text-lg font-bold">{j.role}</p>
            <p className="text-ink-soft">{j.company}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-ink-soft marker:text-sage">
              {j.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {/* งานนอกสาย dev — แยกจาก timeline ให้ประวัติต่อเนื่องโดยไม่ปนกับงาน dev */}
        <div data-reveal className="rounded-card border border-ink/10 p-5">
          <p className={sub}>{other.title} · {other.years}</p>
          <p className="font-heading mt-2 font-bold">{other.role}</p>
          <p className="text-sm text-ink-soft">{other.company}</p>
        </div>
        <div data-reveal className="rounded-card bg-surface p-5">
          <p className={sub}>{t('experience.eduTitle')}</p>
          <ul className="mt-3 space-y-4">
            {edu.map((e) => (
              <li key={e.school}>
                <p className="font-mono text-xs text-ink-soft">{e.year}</p>
                <p className="mt-0.5 font-bold leading-snug">{e.school}</p>
                <p className="text-sm text-ink-soft">{e.degree}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
