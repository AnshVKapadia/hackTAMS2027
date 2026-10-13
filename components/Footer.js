import { event, eventTitle } from '../data/event.mjs'
import RegistrationStatus from './RegistrationStatus'

export default function Footer() {
  const contactLinks = [
    ['email', event.links.email ? `mailto:${event.links.email}` : null],
    ['instagram', event.links.instagram], ['discord', event.links.discord],
    ['project submissions', event.links.devpost], ['donations', event.links.donation],
  ].filter(([, url]) => url)

  return (
    <footer className="bg-c5 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-3">
        <div><a href="#home" className="text-2xl font-bold">{eventTitle}</a><p className="mt-3">{event.tagline}</p></div>
        <section id="registration" tabIndex={-1} aria-labelledby="registration-title">
          <h2 id="registration-title" className="text-xl font-bold">registration</h2>
          <div className="mt-4"><RegistrationStatus /></div>
          <p className="mt-4">Deadline: {event.registration.deadline}</p>
        </section>
        <div>
          <h2 className="text-xl font-bold">stay connected</h2>
          {contactLinks.length ? <ul className="mt-4 space-y-3">{contactLinks.map(([label, url]) => <li key={label}><a href={url} className="underline underline-offset-4">{label}</a></li>)}</ul> : <p className="mt-4">Contact channels: {event.announcement}</p>}
          <p className="mt-4">{event.logistics.conductUrl ? <a href={event.logistics.conductUrl} className="underline">Code of conduct</a> : `Code of conduct: ${event.announcement}`}</p>
        </div>
      </div>
    </footer>
  )
}
