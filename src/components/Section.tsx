import type { ReactNode } from 'react'

/** โครงทุก section: ป้ายหัวข้ออยู่ซ้าย เนื้อหาอยู่ขวา (มือถือเรียงลง) */
export function Section({
  id,
  label,
  children,
  wide = false,
}: {
  id: string
  label: string
  children: ReactNode
  /** เนื้อหากว้างเต็มคอลัมน์ขวา (เวที Projects) แทนความกว้างอ่านสบาย */
  wide?: boolean
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-8 md:grid-cols-[11rem_1fr] md:gap-10 md:py-20">
        <div>
          <h2 id={`${id}-title`} className="section-label md:sticky md:top-24">
            {label}
          </h2>
        </div>
        <div className={wide ? 'min-w-0' : 'min-w-0 max-w-[40rem]'}>{children}</div>
      </div>
    </section>
  )
}
