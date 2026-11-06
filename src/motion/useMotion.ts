import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import i18n from '../i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HEADER_OFFSET = -72

/**
 * Motion ทั้งหน้า อ่าน hook จาก markup:
 * data-speed (parallax) · data-reveal (fade-up) · data-line (เส้น timeline)
 * data-count (นับเลข) · data-tilt (การ์ดเอียงตามเมาส์)
 * reduced-motion → ไม่สร้างอะไรเลย เนื้อหานิ่งครบ
 */
export function useMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px)',
        fine: '(pointer: fine)',
      },
      (ctx) => {
        const { motion, mobile, fine } = ctx.conditions as Record<string, boolean>
        if (!motion) return

        // Smooth scroll
        const lenis = new Lenis()
        lenis.on('scroll', ScrollTrigger.update)
        const tick = (t: number) => lenis.raf(t * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        // anchor link ให้เลื่อนผ่าน lenis
        const onClick = (e: MouseEvent) => {
          const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
          if (!a) return
          const id = a.getAttribute('href')!
          const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id)
          if (target === null) return
          e.preventDefault()
          lenis.scrollTo(target, { offset: HEADER_OFFSET })
          history.replaceState(null, '', id)
        }
        document.addEventListener('click', onClick)

        // Parallax
        const range = mobile ? 10 : 20
        gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
          const speed = Number(el.dataset.speed) || 0.3
          gsap.to(el, {
            yPercent: -speed * range,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

        // Reveal — ซ่อนด้วย JS เท่านั้น (ไม่ตั้ง opacity:0 ใน CSS)
        gsap.set('[data-reveal]', { opacity: 0, y: 24 })
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }),
          // ห้ามใส่ overwrite: 'auto' — มันฆ่า quickTo ของ tilt ที่อยู่บนการ์ดเดียวกัน
        })

        // เส้น timeline วาดตาม scroll
        gsap.utils.toArray<HTMLElement>('[data-line]').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: 'top',
              ease: 'none',
              scrollTrigger: { trigger: line.parentElement ?? line, start: 'top 70%', end: 'bottom 60%', scrub: true },
            },
          )
        })

        // นับเลข — คง suffix เช่น "9+"
        // เก็บค่าจริงไว้ใน dataset: StrictMode/revert รันซ้ำแล้วอย่าอ่าน "0+" ที่เราเขียนทับ
        const cleanups: (() => void)[] = []
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const original = (el.dataset.countOriginal ??= el.textContent ?? '')
          cleanups.push(() => {
            el.textContent = original
          })
          const m = original.match(/^(\d+)(.*)$/)
          if (!m) return
          const end = Number(m[1])
          const suffix = m[2]
          const obj = { v: 0 }
          gsap.to(obj, {
            v: end,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onStart: () => {
              el.textContent = `0${suffix}`
            },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`
            },
            onComplete: () => {
              el.textContent = original
            },
          })
        })

        // Tilt — desktop เท่านั้น
        if (fine) {
          gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((card) => {
            gsap.set(card, { transformPerspective: 800 })
            // overwrite 'auto' ฆ่าเฉพาะ tween rotate เดิม ไม่แตะ reveal (y/opacity)
            const tiltTo = (rotateX: number, rotateY: number) =>
              gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect()
              tiltTo(-((e.clientY - r.top) / r.height - 0.5) * 10, ((e.clientX - r.left) / r.width - 0.5) * 10)
            }
            const leave = () => tiltTo(0, 0)
            card.addEventListener('pointermove', move)
            card.addEventListener('pointerleave', leave)
            cleanups.push(() => {
              card.removeEventListener('pointermove', move)
              card.removeEventListener('pointerleave', leave)
            })
          })
        }

        return () => {
          cleanups.forEach((fn) => fn())
          document.removeEventListener('click', onClick)
          gsap.ticker.remove(tick)
          lenis.destroy()
        }
      },
    )

    return () => mm.revert()
  })

  // ความสูงหน้าเปลี่ยน (สลับภาษา, ฟอนต์โหลด, รูปโหลด) → คำนวณตำแหน่ง trigger ใหม่
  // ไม่งั้น reveal ที่อยู่ล่าง ๆ อาจไม่ถึงจุด start และค้าง opacity 0
  useEffect(() => {
    let timer = 0
    const refresh = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)
    i18n.on('languageChanged', refresh)
    return () => {
      clearTimeout(timer)
      ro.disconnect()
      i18n.off('languageChanged', refresh)
    }
  }, [])
}
