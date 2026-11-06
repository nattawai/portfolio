# STATUS — Developer Portfolio

workflow: `web-studio` plugin (`E:\Workspace\Claude Plugins\web-studio`)

| ขั้น | สถานะ |
|---|---|
| 1. Brief | ✅ `docs/brief.md` |
| 2. Direction | ✅ Night Studio (redesign 2026-11-07, branch `redesign/faseeh-moritz`) — `docs/design.md` |
| 3. Structure | ✅ 5 sections + stack อนุมัติแล้ว |
| 4. Scaffold | ✅ React + Vite + TS, tokens, i18n |
| 5. Build | ✅ ครบ 5 section (Hero, About, Projects, Experience, Contact) |
| 6. Motion | ✅ `src/motion/useMotion.ts` — Lenis, parallax, reveal, เส้น timeline, นับเลข, tilt (desktop) |
| 7. QA | ✅ `docs/qa-report.md` — Lighthouse mobile 98/100/100/100, desktop 100×4, axe 0, reduced-motion ผ่าน |
| 8. Deploy | ✅ 2026-11-07 https://portfolio.waivern.org — auto-deploy จาก GitHub `nattawai/portfolio` (main) ผ่าน Cloudflare Pages `nattawai-portfolio` |

## Decisions
| วันที่ | ตัดสินใจ | เหตุผล |
|---|---|---|
| 2026-11-07 | Stack = React + Vite + TypeScript | ผู้ใช้ถนัด React; React มีตลาดงานใหญ่สุด; เว็บนี้เป็นผลงานโชว์ด้วย; หน้าเดียวไม่ต้องใช้ SSR. ย้ายไป Next.js ได้ถ้าตำแหน่งงานต้องการ |
| 2026-11-07 | Tailwind v4 + CSS variables tokens | token ที่เดียว ใช้ได้ทุก framework |
| 2026-11-07 | GSAP + @gsap/react + Lenis | parallax ลื่น, cleanup อัตโนมัติ |
| 2026-11-07 | react-i18next, เนื้อหาใน `src/i18n/th.json`, `en.json` | แก้เนื้อหาไม่ต้องแตะโค้ด, ย้าย stack ได้ |
| 2026-11-07 | ปรับสี: เพิ่ม `--ink`, `--sage-ink` | `--sage`, `--clay` contrast ไม่พอสำหรับตัวหนังสือ |
| 2026-11-07 | ตำแหน่งหลัก = "Full-Stack Developer" + บรรทัดรอง "เน้น Backend + AI" | ใส่ 3 ตำแหน่งพร้อมกันทำให้ภาพไม่ชัด; Backend/AI เป็นจุดขายเสริม |
| 2026-11-07 | ชื่อแยก 2 บรรทัด, h1 `clamp(2rem,7.5vw,4.5rem)` | นามสกุลยาว (Wiwatwisawakorn) ต้องไม่ล้นที่ 375px — ตรวจแล้ว scrollWidth = 375 |
| 2026-11-07 | รูปโปรไฟล์ใช้ monogram "NW" ชั่วคราว | รอรูปจริง → `public/profile.webp` แล้วตั้ง `HAS_PHOTO = true` ใน `Hero.tsx` |
| 2026-11-07 | เนื้อหา About/ตัวเลข อ้างอิง resume (ภาคผนวก ก) | 9+ ปี, 12 ระบบ, Web/Mobile/API; ไม่ระบุชื่อหน่วยงานลูกค้าในเว็บ (ชื่อ/ช่วงปีในเอกสารไม่ตรงปัจจุบันทั้งหมด) |
| 2026-11-07 | ตำแหน่ง Hero → "Senior Full-Stack Developer" | resume ระบุ Senior Developer |
| 2026-11-07 | ป้าย "AI Integration" เก็บไว้ — รองรับด้วย AI Virtual Office + web-studio | ⚠️ ทั้งสองยัง private: ต้องเปิด public หรือใส่ demo/รูป ก่อน deploy |
| 2026-11-07 | Projects 6 ชิ้น: AI Office, web-studio, TS Planner (live), Shalapao (OSS), Finance & Risk, Workflow & E-Signature | ผสม AI / ใช้งานจริง / ระบบองค์กร; งานองค์กรไม่มีลิงก์ ระบุว่าเป็นระบบภายใน |
| 2026-11-07 | หัวการ์ดใช้ gradient + ตัวย่อชั่วคราว | รอ screenshot จริงของแต่ละงาน (แนะนำ 1200×630 webp) |
| 2026-11-07 | Skills + Experience จาก CV: 6 กลุ่มทักษะ, 3 ตำแหน่งงาน (2560–ปัจจุบัน), การศึกษา TNI 2557 | TH แสดงปี พ.ศ., EN แสดงปี ค.ศ.; Passenger Service Agent ใส่เป็นการ์ด "งานอื่น" แยกจาก timeline (ผู้ใช้ขอ 2026-11-07) |
| 2026-11-07 | ชื่อบริษัท EN: We Chef (ไม่ใช่ V Chef) ตามผู้ใช้ |  |
| 2026-11-07 | Timeline แก้ตามผู้ใช้: 2569–ปัจจุบัน Gabriel & Lim (Health Platform), 2565–2569 GPM | CV เดิมระบุ Bay Computing ซึ่งไม่ตรง; ชื่อเต็ม: GPM Global Co., Ltd. / บริษัท จีพีเอ็ม โกลบอล จำกัด (ยืนยันแล้ว) |
| 2026-11-07 | Contact: อีเมล wai.natthasak@gmail.com, LinkedIn natthasak-w, GitHub ทั้ง natthasak-w และ nattawai | ผู้ใช้พิมพ์ "gmaill.com" — แก้เป็น gmail.com (ผู้ใช้ยืนยันแล้ว) |
| 2026-11-07 | ปุ่ม Resume ซ่อนไว้ (`HAS_RESUME = false` ใน Contact.tsx) | รอไฟล์ `public/resume.pdf` |
| 2026-11-07 | Motion รวมไว้ hook เดียว `useMotion()` เรียกใน App.tsx, อ่าน data-* จาก markup | section ไม่ต้องรู้เรื่อง animation; ปิดทั้งหมดเมื่อ reduced-motion |
| 2026-11-07 | ScrollTrigger.refresh เมื่อความสูง body เปลี่ยน (ResizeObserver) | สลับภาษา/ฟอนต์/รูปโหลดทำให้ตำแหน่ง trigger เพี้ยน — reveal ด้านล่างค้าง opacity 0 |
| 2026-11-07 | `--clay` #d08c60 → #d49266 | ปุ่มหลัก contrast 4.49 ไม่ผ่าน AA → 4.79 |
| 2026-11-07 | Google Fonts โหลดแบบ `media=print onload` + robots.txt | Lighthouse mobile perf 92→98, SEO 91→100 |
| 2026-11-07 | Deploy เป็นโปรเจกต์ใหม่ `natthasak-portfolio` + subdomain portfolio.waivern.org | ไม่ทับ `personal-web-application` (waivern.org, ผูก Git) ที่มีอยู่ |
| 2026-11-07 | og-image 1200×630 (`public/og-image.png`), canonical/og:url/sitemap ชี้ portfolio.waivern.org, `_headers` cache assets 1 ปี | แชร์ลิงก์แล้วมีภาพ; ถ้าเปลี่ยนโดเมนต้องแก้ index.html, robots.txt, sitemap.xml |
| 2026-11-07 | GitHub `nattawai/portfolio` + `nattawai/web-studio` (public), commit ด้วยอีเมล noreply | ผู้สัมภาษณ์ดูโค้ดได้; web-studio public ทำให้การ์ดใน Projects มีลิงก์ |
| 2026-11-07 | ย้ายไป Pages `nattawai-portfolio` (Git) — `natthasak-portfolio` (Direct Upload) เลิกใช้ | Direct Upload เปลี่ยนเป็น Git ไม่ได้ |

| 2026-11-07 | **ห้ามระบุชื่อลูกค้า/หน่วยงาน** (รัฐวิสาหกิจ, มหาวิทยาลัย) ทั้งในเว็บ, repo และภาพ — ใช้คำกลาง ๆ เช่น "รัฐวิสาหกิจ", "มหาวิทยาลัยรัฐ"; ห้ามใช้ชื่อแอปที่ชี้ตัวลูกค้า | ผู้ใช้แจ้ง: ข้อมูลลับ เปิดเผยไม่ได้ |
| 2026-11-07 | ล้าง git history เป็น commit เดียว (force push), ลบ Pages `natthasak-portfolio` และ deployment เก่าทั้งหมด | เวอร์ชันเก่ามีชื่อลูกค้า — ลบ repo เก่าแล้วสร้าง `nattawai/portfolio` ใหม่ (id 1448639097) — commit เก่า 404 แล้ว ✅; สร้าง Pages `nattawai-portfolio` ใหม่ผูก repo ใหม่ + โดเมนเดิม |
| 2026-11-07 | Redesign: layout แบบ faseeh ทุก section, Projects เป็นเวทีแบบ moritz, โทน "มืดอุ่น" + ปุ่มสลับธีม (ค่าเริ่มตามเครื่อง) | ผู้ใช้เลือก; contrast ผ่าน AA ทั้งสองธีม (ตารางใน design.md) |
| 2026-11-07 | ภาพในจอ Projects เป็น SVG นามธรรม (`ProjectArt.tsx`) ทุกงาน | ห้ามใช้ภาพหน้าจอระบบลูกค้า |
| 2026-11-07 | Skills แยกเป็น section แบบ faseeh: ใช้อยู่ / กำลังทดลอง / เคยใช้ / งานที่ถนัด + ไอคอน simple-icons (CC0) | ผู้ใช้ขอให้เหมือน faseeh; การจัดกลุ่มอนุมานจาก timeline — ให้ผู้ใช้ตรวจ |
| 2026-11-07 | ไม่ใส่ reveal animation ให้ข้อความ Hero/About ส่วนบน | reveal ทำให้ LCP mobile 3.3s (perf 87) → เอาออกแล้ว 1.9s (perf 96–97) |
| 2026-11-07 | เอา AI Virtual Office ออกจาก Projects | ผู้ใช้แจ้ง: ระบบล้มแล้ว ไม่มีประโยชน์ใช้งานจริง |
| 2026-11-07 | TS Classic Planner ใช้ภาพแคปจริง `public/projects/ts-planner.webp` (1280×800) งานอื่นยังเป็น SVG นามธรรม | มีแค่งานนี้ที่มีหน้าจอสาธารณะ; เพิ่มภาพงานอื่นได้ที่ `SCREEN` ใน `ProjectArt.tsx` |
| 2026-11-07 | Skills: hover แต่ละตัวมีลูกเล่นเฉพาะ (คลาส `fx-*` ใน global.css) + ย้อมสีแบรนด์ | ผู้ใช้ขอ; ปิดเมื่อ reduced-motion |
| 2026-11-07 | การศึกษา: TNI 2553–2557 + โรงเรียนกรุงเทพคริสเตียนวิทยาลัย ป.1–ม.6 (ใส่แล้ว) | ผู้ใช้ให้ข้อมูล |
| 2026-11-07 | เพิ่มผลงาน waivern.org (ใช้งานจริง) และ Shalam Console (แอปเดสก์ท็อป · tag ใหม่ `desktop`) จาก F:\Project | ผู้ใช้เลือก; Archmap ยังไม่ใส่เพราะยังมีบัค — ใส่ทีหลังได้ |
| 2026-11-07 | ภาพจริงในจอเพิ่ม: waivern (แคปหน้า /oil สาธารณะ), Shalapao (เปิดหน้าเว็บบนเครื่องแล้วป้อนข้อมูลตัวอย่าง — ไม่ใช่เงินจริง, เว็บจริงต้องล็อกอิน LINE), Shalam Console (ภาพ hi-fi ที่อนุมัติแล้วใน repo, ชื่อผู้ใช้เป็นตัวอย่าง) | ผู้ใช้ขอให้แคปงานที่มีหน้าจอ; web-studio เป็น plugin ไม่มีหน้าจอ จึงยังเป็น SVG |
## Deploy
push เข้า `main` → Cloudflare build (`npm run build`, output `dist`) และ deploy เอง
gh ในเครื่อง active = natthasak-w ต้องสลับก่อน push:
```bash
gh auth switch -u nattawai && git push && gh auth switch -u natthasak-w
```
