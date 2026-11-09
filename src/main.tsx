import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './i18n'
import App from './App.tsx'
import { NotFound } from './NotFound.tsx'

const root = document.getElementById('root')!
// 404.html ถูก prerender พร้อม data-page="404"
const is404 = root.dataset.page === '404'
createRoot(root).render(
  <StrictMode>
    {is404 ? <NotFound /> : <App />}
  </StrictMode>,
)
