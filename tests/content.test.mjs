import assert from 'node:assert/strict'
import test from 'node:test'
import { event, faqs, registrationIsOpen } from '../data/event.mjs'
import { getSiteUrl } from '../utils/site-url.mjs'

test('annual content has unique IDs and complete entries', () => {
  for (const items of [faqs, event.program, event.tracks.items, event.prizes.items, event.speakers.items, event.sponsors.items, event.partners.items]) {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'IDs must be unique within each section')
    for (const item of items) assert.ok(item.id && (item.question || item.name || item.title), 'Entry needs an ID and a label')
  }
  assert.ok(Number.isInteger(event.year))
  assert.ok(event.date && event.location && event.registration.deadline)
})

test('closed registration cannot expose a leftover form', () => {
  assert.ok(['closed', 'open'].includes(event.registration.status))
  if (event.registration.status === 'closed') {
    assert.equal(event.registration.url, null, 'Remove old forms when registration is closed')
    assert.equal(registrationIsOpen, false)
  } else {
    assert.ok(registrationIsOpen, 'Open registration needs a URL')
  }
})

test('published links use HTTPS and unconfirmed contact fields stay empty', () => {
  const urls = [
    event.registration.url, event.siteUrl, event.logistics.conductUrl,
    ...Object.entries(event.links).filter(([key]) => key !== 'email').map(([, url]) => url),
    ...event.sponsors.items.map((item) => item.url),
    ...event.partners.items.map((item) => item.url),
  ]
  for (const url of urls.filter(Boolean)) assert.equal(new URL(url).protocol, 'https:')
  if (event.links.email) assert.match(event.links.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
})

test('canonical URL is optional, normalized and rejects unsafe or malformed origins', () => {
  assert.equal(getSiteUrl(null), null)
  assert.equal(getSiteUrl('https://example.com'), 'https://example.com/')
  for (const value of ['not a url', 'javascript:alert(1)', 'https://example.com/old-event', 'https://user:pass@example.com', 'https://example.com/?old=true', 'https://example.com/#old']) {
    assert.throws(() => getSiteUrl(value))
  }
})
