import { useTranslation } from 'react-i18next'
import { LangSwitch } from './components/LangSwitch'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { useMotion } from './motion/useMotion'

export default function App() {
  const { t } = useTranslation()
  useMotion()
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-bg/70 px-4 py-4 backdrop-blur sm:px-8">
        <a href="#top" className="font-bold">{t('nav.brand')}</a>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm">
          <a href="#projects" className="hidden text-ink-soft hover:text-ink sm:inline">{t('nav.projects')}</a>
          <a href="#experience" className="hidden text-ink-soft hover:text-ink sm:inline">{t('nav.experience')}</a>
          <a href="#contact" className="hidden text-ink-soft hover:text-ink sm:inline">{t('nav.contact')}</a>
          <LangSwitch />
        </nav>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
