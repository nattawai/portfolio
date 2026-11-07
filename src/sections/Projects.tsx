import { useEffect, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../components/Section'
import { Monitor, ProjectArt } from '../components/ProjectArt'
import { ArrowUpRight } from '../components/Icons'

type Tag = 'ai' | 'live' | 'oss' | 'enterprise' | 'desktop'
type Project = {
  id: string
  tag: Tag
  title: string
  desc: string
  stack: string[]
  links: { demo?: string; code?: string }
}

function Details({ p }: { p: Project }) {
  const { t } = useTranslation()
  const link = 'inline-flex items-center gap-1 text-sage-ink underline-offset-4 hover:underline'
  return (
    <>
      <p className="leading-relaxed text-ink-soft">{p.desc}</p>
      <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <li key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-ink-soft">{s}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
        {p.links.demo && (
          <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={link}>
            {t('projects.demo')} <ArrowUpRight />
          </a>
        )}
        {p.links.code && (
          <a href={p.links.code} target="_blank" rel="noopener noreferrer" className={link}>
            {t('projects.code')} <ArrowUpRight />
          </a>
        )}
        {!p.links.demo && !p.links.code && (
          <span className="text-xs font-normal text-ink-soft">
            {p.tag === 'enterprise' ? t('projects.private') : t('projects.soon')}
          </span>
        )}
      </div>
    </>
  )
}

/** จอ ≥ md: เวที — รายชื่อซ้าย จอภาพขวา, hover / โฟกัส / คลิก เพื่อเปลี่ยนภาพ */
function Stage({ items }: { items: Project[] }) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  // ไล่สีจางขอบบน/ล่างเมื่อยังเลื่อนต่อได้ (บอกว่ารายการยังมีอีก)
  const [fade, setFade] = useState({ top: false, bottom: true })
  const onScroll = (el: HTMLElement) => {
    setFade({ top: el.scrollTop > 4, bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 4 })
  }
  const list = useRef<HTMLDivElement>(null)
  // วัดใหม่เมื่อขนาดเปลี่ยน (เช่น ซ่อนอยู่ตอนจอแคบ แล้วขยายจอ)
  useEffect(() => {
    const el = list.current
    if (!el) return
    const ro = new ResizeObserver(() => onScroll(el))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  // ล้อเมาส์: ถ้ากล่องยังเลื่อนไปทางนั้นได้ → เลื่อนกล่อง (กันไม่ให้ Lenis เลื่อนทั้งหน้า)
  // สุดกล่องแล้ว → ปล่อยให้หน้าเลื่อนต่อ ไม่ติดค้าง
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const canDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1
    const canUp = el.scrollTop > 0
    if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) e.stopPropagation()
  }
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const p = items[active]

  // ปุ่มลูกศรขึ้น/ลงเลื่อนรายการ (แบบ tablist แนวตั้ง)
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + items.length) % items.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="hidden gap-8 md:grid md:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
      {/* รายการยาว → เลื่อนในกล่องเอง สูงไม่เกินจอภาพ+รายละเอียด */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={t('projects.title')}
        onKeyDown={onKey}
        onScroll={(e) => onScroll(e.currentTarget)}
        ref={list}
        onWheel={onWheel}
        style={{
          maskImage: `linear-gradient(to bottom, ${fade.top ? 'transparent' : 'black'}, black 2.5rem, black calc(100% - 2.5rem), ${fade.bottom ? 'transparent' : 'black'})`,
        }}
        className="scrollbar-thin flex max-h-[30rem] flex-col gap-1 overflow-y-auto pr-1 lg:max-h-[34rem]"
      >
        {items.map((it, i) => {
          const on = i === active
          return (
            <button
              key={it.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${it.id}`}
              aria-selected={on}
              aria-controls="project-panel"
              tabIndex={on ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                on ? 'bg-surface text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{it.title}</span>
                <span className="mt-0.5 block font-mono text-xs text-sage-ink">{t(`projects.tags.${it.tag}`)}</span>
              </span>
              <ArrowUpRight className={`size-4 shrink-0 transition-opacity ${on ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          )
        })}
      </div>

      <div id="project-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} className="min-w-0">
        <Monitor>
          {/* ทุกภาพซ้อนกัน แล้ว crossfade ด้วย opacity (reduced-motion → เปลี่ยนทันที) */}
          {items.map((it, i) => (
            <ProjectArt
              key={it.id}
              id={it.id}
              className={`absolute inset-0 size-full transition-opacity duration-[350ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </Monitor>
        <div className="mt-6" aria-live="polite">
          <h3 className="font-heading text-xl font-bold">{p.title}</h3>
          <div className="mt-2">
            <Details p={p} />
          </div>
        </div>
      </div>
    </div>
  )
}

/** จอ < md: ไม่มี hover → การ์ดเรียงลง แต่ละใบมีจอเล็กของตัวเอง */
function Cards({ items }: { items: Project[] }) {
  const { t } = useTranslation()
  return (
    <ul className="grid gap-5 md:hidden">
      {items.map((p) => (
        <li key={p.id} data-reveal className="rounded-card bg-surface p-4">
          <Monitor small>
            <ProjectArt id={p.id} className="absolute inset-0 size-full" />
          </Monitor>
          <p className="mt-4 font-mono text-xs text-sage-ink">{t(`projects.tags.${p.tag}`)}</p>
          <h3 className="font-heading mt-1 text-lg font-bold leading-snug">{p.title}</h3>
          <div className="mt-2 text-sm">
            <Details p={p} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true }) as Project[]

  return (
    <Section id="projects" label={t('projects.title')} wide>
      <p data-reveal className="mb-8 max-w-[40rem] text-lg leading-relaxed text-ink-soft">{t('projects.lead')}</p>
      <Stage items={items} />
      <Cards items={items} />
    </Section>
  )
}
