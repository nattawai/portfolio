import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Theme = 'dark' | 'light'
const KEY = 'theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

// ธีมที่ใช้อยู่จริง: ค่าที่ผู้ชมเลือก (data-theme จาก script ใน index.html) > ค่าของเครื่อง
function current(): Theme {
  if (typeof document === 'undefined') return 'dark' // ตอน prerender
  const set = document.documentElement.dataset.theme
  if (set === 'dark' || set === 'light') return set
  return media().matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<Theme>(current)

  // ผู้ชมยังไม่ได้เลือกเอง → ตามเครื่องเมื่อเครื่องเปลี่ยนธีม
  useEffect(() => {
    const mq = media()
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(current())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage อาจถูกปิด */
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? t('nav.toLight') : t('nav.toDark')
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
    >
      {theme === 'dark' ? (
        // พระอาทิตย์ = กดเพื่อไปธีมสว่าง
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  )
}
