import { useTranslation } from 'react-i18next'
import { LANGS } from '../i18n'

export function LangSwitch() {
  const { i18n } = useTranslation()
  return (
    <div className="flex gap-1 text-sm" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => i18n.changeLanguage(l)}
          aria-pressed={i18n.language === l}
          className="rounded-full px-2.5 py-1 uppercase text-ink-soft aria-pressed:bg-ink aria-pressed:text-bg"
        >
          {l}
        </button>
      ))}
    </div>
  )
}
