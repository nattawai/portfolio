# Design — Soft Studio

ทันสมัย เป็นมืออาชีพ เข้าถึงง่าย · แสงเช้าในสตูดิโอ การ์ดนุ่ม เงาบาง รูปทรงลอยช้า ๆ

## Color tokens
ค่าจริงอยู่ที่ `src/styles/tokens.css` — **ห้าม hard-code สีในคอมโพเนนต์**

| Token | Hex | ใช้กับ | หมายเหตุ contrast (บน `--bg`) |
|---|---|---|---|
| `--bg` | `#FAF6F1` | พื้นหลังหลัก | — |
| `--surface` | `#FFFFFF` | การ์ด | — |
| `--ink` | `#3A332D` | ข้อความหลัก | ผ่าน AA สบาย |
| `--ink-soft` | `#6B625A` | ข้อความรอง | ผ่าน AA |
| `--sage` | `#8FA68A` | blob / พื้นตกแต่งเท่านั้น | ❌ ห้ามใช้เป็นตัวหนังสือ |
| `--sage-ink` | `#5B7556` | ลิงก์ / ป้ายกำกับ | ผ่าน AA |
| `--clay` | `#D49266` | ปุ่มหลัก / จุดเน้น (ตัวหนังสือบนปุ่มใช้ `--ink`, contrast 4.79 — เดิม #D08C60 ได้ 4.49 ไม่ผ่าน) | ❌ ห้ามใช้เป็นตัวหนังสือบน `--bg` |

## Typography
- อังกฤษ: **Manrope** · ไทย: **Anuphan** (Google Fonts)
- หัวข้อ Hero ใหญ่ ใช้ `clamp()` ให้ย่อตามจอ

## Motion rules
1. ขยับเฉพาะ `transform` และ `opacity`
2. ทำให้สวยแบบนิ่งก่อน แล้วค่อยเติม motion
3. `prefers-reduced-motion: reduce` → ปิด parallax/smooth scroll ทั้งหมด
4. มือถือ (pointer: coarse) → ปิด tilt ตามเมาส์, ลดระยะ parallax

## Motion plan ต่อ section
| Section | เอฟเฟกต์ |
|---|---|
| Hero | blob เสจ/ดินเผา 2–3 ก้อนลอยช้ากว่า scroll; รูปโปรไฟล์เลื่อนช้ากว่าข้อความ |
| About | ข้อความ fade-up ทีละบรรทัด; ตัวเลขนับขึ้น |
| Projects | การ์ดโผล่เป็นจังหวะ; tilt ตามเมาส์ (desktop) |
| Experience | เส้น timeline วาดตาม scroll |
| Contact | blob มาบรรจบกัน |

## QA criteria (ต้องผ่านก่อน deploy)
- Lighthouse Performance / Accessibility / Best Practices / SEO ≥ 90
- ไม่มี error ใน console
- 375px / 768px / 1440px ไม่มี horizontal scroll
- contrast ข้อความผ่าน WCAG AA
