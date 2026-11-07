import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import {
  siAndroid,
  siAntdesign,
  siApple,
  siClaude,
  siCloudflare,
  siCloudflareworkers,
  siDart,
  siDotnet,
  siFlutter,
  siGsap,
  siHono,
  siJavascript,
  siModelcontextprotocol,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVitest,
  type SimpleIcon,
} from 'simple-icons'
import { Section } from '../components/Section'

type Group = { group: string; items: string[]; focus?: boolean }

// ไอคอนแบรนด์ (simple-icons, CC0) — import ทีละตัวเพื่อให้ bundle มีแค่ที่ใช้
const BRAND: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  'C#': siDotnet,
  'ASP.NET': siDotnet,
  React: siReact,
  'Next.js': siNextdotjs,
  'Tailwind CSS': siTailwindcss,
  'Ant Design': siAntdesign,
  'Node.js': siNodedotjs,
  Hono: siHono,
  PostgreSQL: siPostgresql,
  'Cloudflare Workers': siCloudflareworkers,
  'Cloudflare D1': siCloudflare,
  Flutter: siFlutter,
  Dart: siDart,
  'Claude Code': siClaude,
  'Agent Skills & Plugins': siClaude,
  'Hooks & Subagents': siClaude,
  'Model Context Protocol (MCP)': siModelcontextprotocol,
  GSAP: siGsap,
  Vitest: siVitest,
  PHP: siPhp,
  MySQL: siMysql,
  'iOS (Objective-C)': siApple,
  'Android (Java)': siAndroid,
}

// สีแบรนด์ที่มืดเกือบดำ (Next.js, Apple, MCP) มองไม่เห็นบนธีมมืด → ใช้สีตัวหนังสือแทน
function isDark(hex: string) {
  const n = parseInt(hex, 16)
  const l = 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)
  return l < 40
}

// ลูกเล่นตอน hover ของแต่ละ skill — keyframes อยู่ใน global.css (.fx-*)
const FX: Record<string, string> = {
  React: 'fx-orbit', // อะตอมหมุน
  'Next.js': 'fx-dash', // พุ่งไปข้างหน้า
  TypeScript: 'fx-type', // กระพริบเหมือนเคอร์เซอร์
  JavaScript: 'fx-type',
  'C#': 'fx-flip',
  'ASP.NET': 'fx-flip',
  'Tailwind CSS': 'fx-wave', // ลมพัด
  'Ant Design': 'fx-march', // มดเดิน
  'Node.js': 'fx-pulse', // หกเหลี่ยมเต้น
  Hono: 'fx-flame', // เปลวไฟ
  PostgreSQL: 'fx-stack', // ฐานข้อมูลยุบ-เด้ง
  MySQL: 'fx-stack',
  'SQL Server': 'fx-stack',
  'Cloudflare D1': 'fx-stack',
  'Cloudflare Workers': 'fx-drift', // เมฆลอย
  Flutter: 'fx-flutter', // กระพือปีก
  Dart: 'fx-dart', // ปาลูกดอก
  'Claude Code': 'fx-spark', // ประกายหมุน
  'Agent Skills & Plugins': 'fx-spark',
  'Hooks & Subagents': 'fx-spark',
  'Model Context Protocol (MCP)': 'fx-link', // ข้อต่อหมุน
  GSAP: 'fx-elastic', // easing ยืดหยุ่น
  Vitest: 'fx-pass', // เทสผ่าน เด้ง
  PHP: 'fx-wobble',
  'iOS (Objective-C)': 'fx-tilt',
  'Android (Java)': 'fx-hop',
  'Nintex K2 / Workflow Cloud': 'fx-dash', // งานไหลต่อ
  BPMN: 'fx-dash', // ผังกระบวนการ
  DocuSign: 'fx-draw', // เขียนลายเซ็น
  'ERP API': 'fx-shake',
  'REST API': 'fx-shake',
}

// ทักษะที่ไม่มีโลโก้แบรนด์ → ไอคอนเส้นทั่วไป
const GENERIC: Record<string, string> = {
  api: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  flow: 'M5 4h5v5H5zM14 15h5v5h-5zM7.5 9v3.5a2 2 0 0 0 2 2H14',
  sign: 'M4 18c3-6 5 2 7-2s2-6 4-2 2 3 5 2M4 21h16',
  focus: 'M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
}
const genericFor = (name: string) =>
  /SQL|D1/.test(name) ? GENERIC.db : /Nintex|Workflow/.test(name) ? GENERIC.flow : /Sign/.test(name) ? GENERIC.sign : GENERIC.api

function SkillIcon({ name, focus }: { name: string; focus?: boolean }) {
  const brand = BRAND[name]
  if (brand) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`size-3.5 shrink-0 ${FX[name] ?? 'fx-pop'}`}
        // สีแบรนด์เป็นข้อมูลของโลโก้ ไม่ใช่สีของธีม
        style={{ fill: isDark(brand.hex) ? 'currentColor' : `#${brand.hex}` }}
      >
        <path d={brand.path} />
      </svg>
    )
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`size-3.5 shrink-0 text-sage-ink ${focus ? 'fx-orbit' : (FX[name] ?? 'fx-pop')}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={focus ? GENERIC.focus : genericFor(name)} />
    </svg>
  )
}

export function Skills() {
  const { t } = useTranslation()
  const groups = t('skills.groups', { returnObjects: true }) as Group[]

  return (
    <Section id="skills" label={t('skills.title')}>
      <div className="space-y-7">
        {groups.map((g) => (
          <div data-reveal key={g.group}>
            <h3 className="text-[11px] font-bold uppercase text-ink-soft [html:lang(en)_&]:tracking-[0.12em]">{g.group}</h3>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  // --brand: ย้อมขอบ/พื้นตอน hover ด้วยสีแบรนด์ (โลโก้สีเข้ม → สีเน้นของธีม)
                  style={{ '--brand': BRAND[s] && !isDark(BRAND[s].hex) ? `#${BRAND[s].hex}` : 'var(--sage-ink)' } as CSSProperties}
                  className="skill flex cursor-default items-center gap-1.5 rounded-md border border-sage-ink/25 bg-sage-ink/10 px-3 py-[5px] text-[13px] font-medium text-ink"
                >
                  <SkillIcon name={s} focus={g.focus} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
