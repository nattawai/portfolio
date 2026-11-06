# Design — Night Studio (Soft Studio ตอนกลางคืน)

อบอุ่น สงบ เหมือนห้องทำงานไฟสลัว · layout แบบ "คอลัมน์เดียว ป้ายหัวข้อซ้าย เนื้อหาขวา" + เวที Projects แบบ "รายชื่อซ้าย จอภาพขวา"

ต้นแบบ (ยืมแค่หลักการ layout/interaction — ไม่คัดลอกโค้ด ข้อความ ภาพ ฟอนต์):
- ทุก section: faseeh.in — header รูป+ชื่อ+โซเชียล, ป้าย uppercase มีขีดเส้นใต้อยู่ซ้าย, คำสำคัญสีเน้น, กล่อง callout ขอบซ้าย, timeline มีจุด + ป้าย "ปัจจุบัน"
- Projects: moritzpetersen.com — รายชื่องานด้านซ้าย ตัวที่เลือกมีพื้นโค้ง, จอภาพด้านขวาเปลี่ยนภาพตาม hover/โฟกัส/แตะ (crossfade)

## Color tokens
ค่าจริงอยู่ที่ `src/styles/tokens.css` — **ห้าม hard-code สีในคอมโพเนนต์**
ธีมเริ่มตามเครื่อง (`prefers-color-scheme`), ผู้ชมสลับเองได้ที่มุมขวาบน → เก็บใน localStorage `theme`, ตั้ง `data-theme` บน `<html>` ก่อน paint (script ใน `index.html`)

| Token | มืด (หลัก) | สว่าง | ใช้กับ |
|---|---|---|---|
| `--bg` | `#1C1A17` | `#FAF6F1` | พื้นหลัง |
| `--surface` | `#26231F` | `#FFFFFF` | การ์ด / รายการที่เลือก |
| `--surface-2` | `#302C27` | `#F1EBE3` | กรอบจอ / ชิป |
| `--ink` | `#EDE6DC` | `#3A332D` | ข้อความหลัก |
| `--ink-soft` | `#B3A99D` | `#6B625A` | ข้อความรอง |
| `--sage` | `#7D9677` | `#8FA68A` | ตกแต่งเท่านั้น ❌ ห้ามเป็นตัวหนังสือ |
| `--sage-ink` | `#9DB896` | `#5B7556` | คำเน้น / ป้าย / ลิงก์ |
| `--clay` | `#D9A07A` | `#D49266` | พื้นปุ่มหลัก ❌ ห้ามเป็นตัวหนังสือ |
| `--on-clay` | `#1C1A17` | `#3A332D` | ตัวหนังสือบนปุ่ม clay |

### Contrast (WCAG, ตรวจ 2026-11-07)
| คู่สี | มืด | สว่าง |
|---|---|---|
| ink / bg | 14.02 | 11.54 |
| ink-soft / bg | 7.51 | 5.54 |
| ink-soft / surface | 6.76 | 5.97 |
| sage-ink / bg | 8.04 | 4.73 |
| sage-ink / surface | 7.25 | 5.09 |
| on-clay / clay | 7.66 | 4.79 |
ผ่าน AA ทุกคู่ (≥ 4.5)

## Typography
- อังกฤษ: **Manrope** · ไทย: **Anuphan** · ป้ายหัวข้อ/ปี/stack: **JetBrains Mono** (ไทย fallback ไป Anuphan) — Google Fonts ทั้งหมด
- ชื่อใน Header ใช้ `clamp()`; ภาษาไทยตัวใหญ่ line-height ≥ 1.15
- ป้ายหัวข้อ EN: uppercase + tracking กว้าง; TH: ไม่ใส่ tracking

## Layout ต่อ section
คอนเทนเนอร์ `max-w-5xl`; จอ ≥ md ใช้ grid `[11rem_1fr]` ป้ายซ้าย เนื้อหาขวา (กว้างอ่านสบาย ~ 40rem)
| Section | โครง |
|---|---|
| Top bar | ชื่อย่อ · ลิงก์ section · TH/EN · ปุ่มสลับธีม (sticky, blur) |
| Header | รูป/monogram มุมโค้ง + ชื่อตัวหนาใหญ่ + ตำแหน่ง + จุดเน้น + ไอคอน GitHub/LinkedIn/Email + ปุ่ม "ดูผลงาน" |
| About | ป้าย "เกี่ยวกับผม" · ย่อหน้าที่มีคำเน้นสี `--sage-ink` (ใช้ `<Trans>` + `<hl>`) · ชิปโดเมนงาน · ตัวเลข 3 ช่อง · callout ขอบซ้าย "สิ่งที่ผมกำลังมองหา" |
| Projects | เวที: รายชื่องานซ้าย (ชื่อ + ป้าย, ตัวที่เลือกพื้น `--surface` + ↗) · จอภาพขวา (กรอบ + ขาตั้ง วาดด้วย CSS) แสดงภาพนามธรรมของงาน · ใต้จอ: คำอธิบาย, stack, ลิงก์. มือถือ (< md): การ์ดเรียงลง แต่ละใบมีจอเล็กของตัวเอง |
| Experience | ป้าย "ประสบการณ์" · timeline เส้น + จุด, งานล่าสุดมีป้าย "ปัจจุบัน" · งานอื่น + การศึกษา · ทักษะเป็นกลุ่มชิป |
| Contact | ป้าย "ติดต่อ" · หัวข้อ + ข้อความ + ปุ่มอีเมล + ลิงก์ · footer |

### ภาพในจอ Projects
- **ห้ามใช้ภาพหน้าจอระบบลูกค้า** — ทุกงานใช้ SVG นามธรรมวาดด้วย token (`src/components/ProjectArt.tsx`)
- ai-office: ห้อง pixel art มีโต๊ะ + agent · web-studio: pipeline brief→deploy · ts-planner: skill tree · shalapao: ซองเงิน · finance-risk: risk matrix + กราฟ · workflow: flow + ลายเซ็น

## Motion rules
1. ขยับเฉพาะ `transform` และ `opacity`
2. ทำให้สวยแบบนิ่งก่อน แล้วค่อยเติม motion
3. `prefers-reduced-motion: reduce` → ปิด smooth scroll / parallax / reveal / crossfade (เปลี่ยนภาพทันที)
4. มือถือ (pointer: coarse) → ไม่มี hover: แตะเพื่อเลือก, ลดระยะ parallax
5. พื้นหลังใช้ CSS blur blob — ไม่ใช้ canvas

## Motion plan ต่อ section
| Section | เอฟเฟกต์ |
|---|---|
| พื้นหลัง | blob เสจ/ดินเผาใหญ่ด้านขวา ลอยช้ากว่า scroll |
| Header | ชื่อ/ตำแหน่ง fade-up ตอนโหลด |
| About | ย่อหน้า fade-up, ตัวเลขนับขึ้น |
| Projects | hover/โฟกัส/แตะรายการ → จอ crossfade 350ms; รายการที่เลือกพื้นเลื่อนนุ่ม |
| Experience | เส้น timeline วาดตาม scroll, รายการ fade-up |
| Contact | fade-up |

## QA criteria (ต้องผ่านก่อน deploy)
- Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 90 (ทั้งสองธีม)
- ไม่มี error ใน console
- 375px / 768px / 1440px ไม่มี horizontal scroll
- contrast ข้อความผ่าน WCAG AA ทั้งมืดและสว่าง
- ไม่มีชื่อลูกค้า/หน่วยงานใน bundle
