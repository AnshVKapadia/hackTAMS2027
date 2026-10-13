import { event } from '../../data/event.mjs'

export default function SponsorsSection() {
  return (
    <section id="sponsors" tabIndex={-1} aria-labelledby="sponsors-title" className="section-shell text-center text-[#556b2f]">
      <h2 id="sponsors-title" className="section-heading">sponsors</h2>
      <p className="mt-6 text-2xl">{event.sponsors.description}</p>
      {event.sponsors.items.length > 0 && <ul className="mt-6 flex flex-wrap justify-center gap-6">{event.sponsors.items.map((sponsor) => <li key={sponsor.id}><a href={sponsor.url} className="inline-block rounded-xl border border-[#556b2f] p-6 underline">{sponsor.name}</a></li>)}</ul>}
      <h3 className="mt-12 text-3xl font-bold sm:text-4xl">partners</h3>
      <p className="mt-4 text-xl">{event.partners.description}</p>
      {event.partners.items.length > 0 && <ul className="mt-6 flex flex-wrap justify-center gap-6">{event.partners.items.map((partner) => <li key={partner.id}><a href={partner.url} className="underline">{partner.name}</a></li>)}</ul>}
    </section>
  )
}
