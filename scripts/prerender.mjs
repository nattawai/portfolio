// หลัง `vite build` + `vite build --ssr`: เขียน HTML สำเร็จรูปของแต่ละภาษา
//   dist/index.html    = อังกฤษ (/)
//   dist/th/index.html = ไทย (/th/)
// ฝั่งเบราว์เซอร์ main.tsx ใช้ createRoot วาดทับเหมือนเดิม
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const SITE = 'https://portfolio.waivern.org'
const PATH = { en: '/', th: '/th/' }
const OG_LOCALE = { en: 'en_US', th: 'th_TH' }

const dist = resolve('dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const { render, render404 } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const lang of ['en', 'th']) {
  const { html, title, description } = await render(lang)
  const url = SITE + PATH[lang]
  const alternates = [
    `<link rel="alternate" hreflang="en" href="${SITE}/" />`,
    `<link rel="alternate" hreflang="th" href="${SITE}/th/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
  ].join('\n    ')

  let out = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${OG_LOCALE[lang]}"`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />\n    ${alternates}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  if (!out.includes(`<div id="root"><`)) throw new Error('prerender: ไม่พบ <div id="root"></div> ใน template')
  const dir = lang === 'en' ? dist : resolve(dist, 'th')
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), out)
  console.log(`prerender ${lang}: ${PATH[lang]} (${(out.length / 1024).toFixed(1)} kB)`)
}

// 404.html: Cloudflare Pages ใช้ไฟล์นี้ตอบ status 404 ให้ทุก URL ที่ไม่มี (แทน SPA fallback ที่ตอบ 200)
{
  const { html, title } = await render404()
  const out = template
    .replace(/<html lang="[^"]*"/, '<html lang="en" data-page="404"')
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>\n    <meta name="robots" content="noindex" />`)
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace('<div id="root"></div>', `<div id="root" data-page="404">${html}</div>`)
  writeFileSync(resolve(dist, '404.html'), out)
  console.log('prerender 404: /404.html')
}

rmSync(resolve('dist-ssr'), { recursive: true, force: true })
