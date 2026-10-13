import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { event, eventTitle, registrationLabel } from '../data/event.mjs'

const escapeXml = (value) => String(value).replace(/[<>&"']/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char])
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#1c4026"/>
  <path d="M0 500Q200 400 400 510T800 490T1200 480V630H0Z" fill="#556b2f"/>
  <rect x="56" y="56" width="1088" height="518" rx="32" fill="#f7f5ed"/>
  <g font-family="sans-serif" fill="#1c4026">
    <text x="104" y="170" font-size="80" font-weight="bold">${escapeXml(eventTitle)}</text>
    <text x="104" y="235" font-size="34">${escapeXml(event.tagline)}</text>
    <text x="104" y="330" font-size="30">Event date: ${escapeXml(event.date)}</text>
    <text x="104" y="386" font-size="30">Location: ${escapeXml(event.location)}</text>
    <text x="104" y="480" font-size="32" font-weight="bold">Registration: ${escapeXml(registrationLabel)}</text>
  </g>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('../public/social-card.png', import.meta.url)))
console.log(`Generated social-card.png for ${eventTitle}`)
