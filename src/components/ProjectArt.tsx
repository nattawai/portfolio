/**
 * ภาพนามธรรมในจอของแต่ละงาน — วาดด้วย token ล้วน ไม่ใช้ภาพหน้าจอระบบลูกค้า
 * viewBox 320×200 (16:10)
 */
const Bg = () => <rect width="320" height="200" className="fill-surface-2" />

function WebStudio() {
  // pipeline: brief → direction → build → qa → deploy
  const steps = [30, 92, 154, 216, 278]
  return (
    <>
      <Bg />
      <path d="M30 100H278" className="stroke-ink/25" strokeWidth="3" strokeDasharray="6 6" />
      {steps.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="100" r={i === 2 ? 20 : 15} className={i < 3 ? 'fill-sage' : 'fill-ink/20'} />
          {i < 2 && <path d={`M${x - 6} 100l4 5 8-10`} className="stroke-bg" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x={x - 18} y="134" width="36" height="6" rx="3" className="fill-ink/25" />
        </g>
      ))}
      <circle cx="154" cy="100" r="28" className="fill-none stroke-clay" strokeWidth="2" />
      <rect x="120" y="36" width="80" height="26" rx="13" className="fill-clay" />
      <rect x="134" y="46" width="52" height="6" rx="3" className="fill-on-clay/60" />
    </>
  )
}

function TsPlanner() {
  // skill tree
  const nodes = [
    [160, 40, 1],
    [90, 95, 1],
    [230, 95, 1],
    [50, 155, 0],
    [130, 155, 1],
    [195, 155, 0],
    [270, 155, 1],
  ] as const
  const links = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  ]
  return (
    <>
      <Bg />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="stroke-ink/25" strokeWidth="3" />
      ))}
      {nodes.map(([x, y, on], i) => (
        <g key={i}>
          <rect x={x - 16} y={y - 16} width="32" height="32" rx="8" className={on ? 'fill-sage' : 'fill-ink/15'} />
          {on ? <rect x={x - 6} y={y - 6} width="12" height="12" rx="2" className="fill-bg/70" /> : null}
        </g>
      ))}
      <rect x="252" y="26" width="48" height="10" rx="5" className="fill-clay" />
      <rect x="252" y="42" width="30" height="6" rx="3" className="fill-ink/25" />
    </>
  )
}

function Shalapao() {
  // ซองเงินหลายใบ + ยอดคงเหลือ
  const env = [
    { x: 28, h: 0.8, c: 'fill-sage' },
    { x: 126, h: 0.45, c: 'fill-clay' },
    { x: 224, h: 0.62, c: 'fill-sage/70' },
  ]
  return (
    <>
      <Bg />
      {env.map((e) => (
        <g key={e.x}>
          <rect x={e.x} y="40" width="68" height="120" rx="10" className="fill-surface" />
          <path d={`M${e.x} 50l34 26 34-26`} className="fill-none stroke-ink/20" strokeWidth="2" />
          <rect x={e.x + 12} y={150 - 60 * e.h} width="44" height={60 * e.h} rx="4" className={e.c} />
          <rect x={e.x + 12} y="168" width="44" height="6" rx="3" className="fill-ink/25" />
        </g>
      ))}
    </>
  )
}

function FinanceRisk() {
  // risk matrix 5×5 + กราฟเส้น
  const level = (r: number, c: number) => r + c
  return (
    <>
      <Bg />
      {Array.from({ length: 25 }, (_, i) => {
        const r = 4 - Math.floor(i / 5)
        const c = i % 5
        const l = level(r, c)
        const cls = l >= 6 ? 'fill-clay' : l >= 4 ? 'fill-clay/45' : l >= 2 ? 'fill-sage/60' : 'fill-sage'
        return <rect key={i} x={28 + c * 26} y={28 + (4 - r) * 30} width="22" height="26" rx="4" className={cls} />
      })}
      <rect x="180" y="28" width="112" height="146" rx="10" className="fill-surface" />
      <polyline points="192,150 210,128 228,136 246,104 264,112 280,72" className="fill-none stroke-sage" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="192" y1="160" x2="280" y2="160" className="stroke-ink/20" strokeWidth="2" />
      <rect x="192" y="42" width="54" height="8" rx="4" className="fill-ink/30" />
    </>
  )
}

function Workflow() {
  // flow: เอกสาร → อนุมัติ → ลายเซ็น
  return (
    <>
      <Bg />
      <rect x="24" y="60" width="64" height="80" rx="8" className="fill-surface" />
      {[76, 90, 104, 118].map((y) => (
        <rect key={y} x="36" y={y} width={y === 118 ? 24 : 40} height="6" rx="3" className="fill-ink/25" />
      ))}
      <path d="M96 100h36" className="stroke-ink/30" strokeWidth="3" />
      <path d="m126 94 8 6-8 6" className="fill-none stroke-ink/30" strokeWidth="3" strokeLinejoin="round" />
      <rect x="140" y="76" width="48" height="48" rx="10" transform="rotate(45 164 100)" className="fill-sage" />
      <path d="m154 100 7 7 13-14" className="fill-none stroke-bg" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M200 100h28" className="stroke-ink/30" strokeWidth="3" />
      <path d="m222 94 8 6-8 6" className="fill-none stroke-ink/30" strokeWidth="3" strokeLinejoin="round" />
      <rect x="236" y="60" width="64" height="80" rx="8" className="fill-surface" />
      <path d="M246 118c8-14 12 6 18-6s8 10 14 0 6 4 12 2" className="fill-none stroke-clay" strokeWidth="3" strokeLinecap="round" />
      <line x1="246" y1="126" x2="290" y2="126" className="stroke-ink/25" strokeWidth="2" />
    </>
  )
}

const ART: Record<string, () => React.JSX.Element> = {
  'web-studio': WebStudio,
  'ts-planner': TsPlanner,
  shalapao: Shalapao,
  'finance-risk': FinanceRisk,
  workflow: Workflow,
}

// งานที่มีหน้าจอจริงและเปิดสาธารณะ → ใช้ภาพแคปจริง (1280×800 webp ใน public/projects)
const SCREEN: Record<string, string> = {
  'ts-planner': '/projects/ts-planner.webp',
  waivern: '/projects/waivern.webp',
  // แคปจากหน้าเว็บจริงบนเครื่อง ป้อนข้อมูลตัวอย่าง (ไม่ใช่เงินจริง)
  shalapao: '/projects/shalapao.webp',
  // ภาพ hi-fi ที่อนุมัติแล้ว (แอปเรนเดอร์ตรงกัน) · ชื่อผู้ใช้ในภาพเป็นข้อมูลตัวอย่าง
  'shalam-console': '/projects/shalam-console.webp',
}

export function ProjectArt({ id, className }: { id: string; className?: string }) {
  const src = SCREEN[id]
  if (src) {
    return <img src={src} alt="" width={1280} height={800} loading="lazy" decoding="async" className={`${className ?? ''} object-cover object-top`} />
  }
  const Art = ART[id] ?? WebStudio
  return (
    <svg aria-hidden viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className={className}>
      <Art />
    </svg>
  )
}

/** กรอบจอ + ขาตั้ง วาดด้วย CSS */
export function Monitor({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div className="mx-auto w-full">
      <div className={`rounded-[1rem] bg-bezel shadow-soft ${small ? 'p-1.5' : 'p-2.5'}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.6rem] bg-surface-2">{children}</div>
      </div>
      <div aria-hidden className={`mx-auto bg-bezel/80 ${small ? 'h-3 w-10' : 'h-6 w-16'}`} />
      <div aria-hidden className={`mx-auto rounded-full bg-bezel/60 ${small ? 'h-1.5 w-24' : 'h-2.5 w-40'}`} />
    </div>
  )
}
