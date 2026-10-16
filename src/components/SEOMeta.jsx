import { useEffect } from 'react'

const BASE = 'https://lumiere.opensung.shop'
const DEFAULT_IMG = `${BASE}/imgs/logo-perolla-transparent.png`
const DEFAULT_DESC = 'Semijoias, folheados e aço inoxidável de Santarém-PA. Compre pelo WhatsApp.'

export default function SEOMeta({ title, description, image, url }) {
  useEffect(() => {
    document.title = title ? `${title} | Pérolla do Tapajós` : 'Pérolla do Tapajós — A beleza que brilha como o Rio'
    setMeta('name', 'description', description || DEFAULT_DESC)
    setOG('og:title', title || 'Pérolla do Tapajós')
    setOG('og:description', description || DEFAULT_DESC)
    setOG('og:image', image || DEFAULT_IMG)
    setOG('og:url', url || window.location.href)
    setOG('og:type', 'website')
  }, [title, description, image, url])
  return null
}

function setMeta(attr, key, val) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = val
}
function setOG(prop, val) { setMeta('property', prop, val) }
