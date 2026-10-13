import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { createStaticServer } from './serve.mjs'
import { event, eventTitle, eventDescription, faqs, registrationIsOpen } from '../data/event.mjs'
import { getSiteUrl } from '../utils/site-url.mjs'

const server = createStaticServer()
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const baseUrl = `http://127.0.0.1:${server.address().port}`
let browser
const reports = []
const expectedSiteUrl = getSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || event.siteUrl)
try {
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' })
  await mkdir('artifacts', { recursive: true })
  for (const [name, width, height] of [['desktop', 1440, 900], ['laptop', 976, 800], ['tablet', 768, 1024], ['mobile', 390, 844], ['narrow-mobile', 320, 640]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    const failedRequests = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => { if (response.status() >= 400) failedRequests.push(response.url()) })
    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager'
      await Promise.all([...document.images].map((img) => img.decode()))
      await document.fonts.ready
    })
    assert.equal(await page.title(), eventTitle)
    assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), eventDescription)
    assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), eventTitle)
    assert.equal(await page.locator('meta[property="og:description"]').getAttribute('content'), eventDescription)
    assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute('content'), eventTitle)
    if (expectedSiteUrl) {
      const imageUrl = new URL(event.socialImage, expectedSiteUrl).href
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), expectedSiteUrl)
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), expectedSiteUrl)
      assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), imageUrl)
      assert.equal(await page.locator('meta[name="twitter:image"]').getAttribute('content'), imageUrl)
    } else {
      assert.equal(await page.locator('link[rel="canonical"], meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]').count(), 0)
    }
    assert.equal(await page.locator('h1').count(), 1)
    assert.equal(await page.locator('html').getAttribute('lang'), 'en')
    assert.equal(await page.locator('details').count(), faqs.length)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    assert.equal(overflow, false, `Horizontal overflow at ${width}px`)
    const headingIsVisible = await page.evaluate(() => document.querySelector('h1').getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom)
    assert.equal(headingIsVisible, true, 'The fixed header must not cover the hero heading')
    const bodyText = await page.locator('body').innerText()
    for (const year of bodyText.match(/\b20\d{2}\b/g) || []) assert.ok(Number(year) >= event.year, 'Outdated year in visible content')
    assert.doesNotMatch(bodyText, /Willis|Google|JP Morgan|Wolfram|AirTag|free food|swag|merch/i)
    if (!registrationIsOpen) assert.equal(await page.locator('#registration a').count(), 0)
    if (!registrationIsOpen) assert.equal(await page.locator('a[href*="forms.gle"], a[href*="docs.google.com/forms"]').count(), 0)
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.filter((link) => !document.getElementById(link.hash.slice(1))).map((link) => link.hash))
    assert.deepEqual(brokenAnchors, [])
    const missingAlt = await page.locator('img:not([alt])').count()
    assert.equal(missingAlt, 0)
    const summary = page.locator('summary').first()
    await summary.focus()
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('details').first().getAttribute('open'), '')
    await page.keyboard.press('Space')
    assert.equal(await page.locator('details').first().getAttribute('open'), null)
    await page.evaluate(() => scrollTo(0, 0))
    if (width < 976) {
      const menu = page.locator('button[aria-controls="navigation-links"]')
      await menu.focus()
      await page.keyboard.press('Enter')
      assert.equal(await menu.getAttribute('aria-expanded'), 'true')
      await page.keyboard.press('Tab')
      assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '#about')
      await page.keyboard.press('Escape')
      assert.equal(await menu.getAttribute('aria-expanded'), 'false')
      assert.ok(await menu.evaluate((element) => element === document.activeElement))
      await menu.click()
      await page.locator('#navigation-links a[href="#about"]').click()
      assert.equal(await menu.getAttribute('aria-expanded'), 'false')
      assert.equal(await page.evaluate(() => document.activeElement.id), 'about')
      await page.evaluate(() => scrollTo(0, 0))
    }
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    assert.deepEqual(accessibility.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.target) })), [], `Accessibility issues at ${width}px`)
    assert.deepEqual(errors, [], 'Browser runtime errors')
    assert.deepEqual(failedRequests, [], 'Failed asset requests')
    await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0) })
    await page.screenshot({ path: `artifacts/layout-${name}.png`, fullPage: true })
    reports.push({ viewport: name, width, height, horizontalOverflow: false, accessibilityViolations: 0, runtimeErrors: 0, failedRequests: 0 })
    console.log(`PASS ${name} (${width}px): layout, keyboard, assets and accessibility`)
    await context.close()
  }
  const missing = await fetch(baseUrl + '/missing-page')
  assert.equal(missing.status, 404)
  const card = await fetch(baseUrl + event.socialImage)
  assert.equal(card.status, 200)
  assert.equal(card.headers.get('content-type'), 'image/png')
  await writeFile('artifacts/browser-report.json', JSON.stringify(reports, null, 2) + '\n')
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}
