# QA Report — 2026-11-07

ตรวจบน production build (`npm run build` → `vite preview` :4173) ด้วย Chrome headless (puppeteer-core + axe-core 4.10) และ Lighthouse 12.8.2

## ผลรวม
| เช็ก | ผล | หมายเหตุ |
|---|---|---|
| Build | ✅ | `tsc -b && vite build` ไม่มี error |
| Layout 375 / 768 / 1440 | ✅ | scrollWidth = ความกว้างจอ ทุกขนาด ทั้ง TH/EN |
| Console | ✅ 0 error | ทั้ง 6 รอบ (3 ขนาดจอ × 2 ภาษา) |
| Lighthouse mobile | ✅ 98 / 100 / 100 / 100 | FCP 1.7s · LCP 1.8s · CLS 0 · TBT 130ms |
| Lighthouse desktop | ✅ 100 / 100 / 100 / 100 | FCP 0.4s · LCP 0.4s · CLS 0.003 · TBT 0ms |
| a11y (axe WCAG 2 A/AA + best-practice) | ✅ 0 violation | หลังแก้ contrast ปุ่ม Hero |
| Contrast | ✅ | ปุ่มหลัก ink บน clay = 4.79 |
| Reduced motion | ✅ | ไม่มี Lenis, parallax/reveal ไม่มี transform, เนื้อหาครบ, ตัวเลขแสดงค่าจริง |
| i18n | ✅ | ไม่มี key หลุด (`hero.` ฯลฯ) ทั้ง TH/EN |
| Reveal ครบหลังเลื่อนทั้งหน้า | ✅ | 0 ชิ้นค้าง opacity 0 |

(Lighthouse เรียง: Performance / Accessibility / Best Practices / SEO)

## สิ่งที่แก้ระหว่าง QA
| ปัญหา | ก่อน | แก้ |
|---|---|---|
| ปุ่ม "ดูผลงาน" contrast 4.49 (< 4.5) | `--clay: #d08c60` | `#d49266` → 4.79 |
| ไม่มี robots.txt (SEO 91) | SPA ส่ง index.html แทน | เพิ่ม `public/robots.txt` |
| ฟอนต์ Google บล็อกการแสดงผล (mobile perf 92) | `<link rel=stylesheet>` | `media="print" onload` + `<noscript>` |

## ยังค้าง (ไม่ใช่ข้อผิดพลาด แต่ต้องทำก่อน deploy)
- รูปโปรไฟล์จริง (`public/profile.webp`, `HAS_PHOTO`), resume PDF (`public/resume.pdf`, `HAS_RESUME`), screenshot หัวการ์ดผลงาน
- AI Virtual Office / web-studio ยัง private — เปิด public หรือใส่ demo
- `<title>`/meta ใน `index.html` เป็นภาษาอังกฤษอย่างเดียวและเขียนว่า "Full-Stack Developer" (Hero ใช้ "Senior Full-Stack Developer")
- เพิ่ม `og:image`, `sitemap.xml` และ URL จริงใน robots.txt ตอน deploy
- oxlint เตือน `Date` ใน render ที่ `Contact.tsx:46` (ปีลิขสิทธิ์) — ไม่กระทบผู้ใช้

## Screenshot
ภาพเต็มหน้าไม่เก็บใน repo (มีข้อมูลงานลูกค้า) — สร้างใหม่ได้ด้วยสคริปต์ QA; ภาพตัวอย่างอยู่ที่ `docs/screenshots/` (เฉพาะ Hero)
