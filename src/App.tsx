import { useTranslation } from 'react-i18next'
import { LangSwitch } from './components/LangSwitch'
import { ThemeToggle } from './components/ThemeToggle'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'
import { useMotion } from './motion/useMotion'

export default function App() {
  const { t } = useTranslation()
  useMotion()
  return (
    <div className="relative isolate overflow-x-clip">
      {/* blob พื้นหลังด้านขวา — CSS blur ล้วน ไม่ใช้ canvas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-speed="0.25" className="absolute -right-40 top-24 size-[28rem] rounded-full bg-sage/20 blur-3xl sm:size-[36rem]" />
        <div data-speed="0.5" className="absolute -right-24 top-[60rem] size-80 rounded-full bg-clay/15 blur-3xl" />
        <div data-speed="0.35" className="absolute -left-40 top-[120rem] size-96 rounded-full bg-sage/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-10 bg-bg/75 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
          <a href="#top" className="font-bold">{t('nav.brand')}</a>
          <nav aria-label="Main" className="flex items-center gap-1 text-sm sm:gap-3">
            <a href="#about" className="hidden px-1 text-ink-soft hover:text-ink sm:inline">{t('nav.about')}</a>
            <a href="#projects" className="hidden px-1 text-ink-soft hover:text-ink sm:inline">{t('nav.projects')}</a>
            <a href="#experience" className="hidden px-1 text-ink-soft hover:text-ink sm:inline">{t('nav.experience')}</a>
            <a href="#skills" className="hidden px-1 text-ink-soft hover:text-ink md:inline">{t('nav.skills')}</a>
            <a href="#contact" className="hidden px-1 text-ink-soft hover:text-ink sm:inline">{t('nav.contact')}</a>
            <LangSwitch />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
