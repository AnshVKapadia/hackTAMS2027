import Image from 'next/image'
import explorerDuck from '../../public/images/explorertreeduck.PNG'
import { event } from '../../data/event.mjs'

export default function TracksAndPrizesSection() {
  return (
    <div className="tracks-background text-white">
      <section id="tracks" tabIndex={-1} aria-labelledby="tracks-title" className="section-shell">
        <h2 id="tracks-title" className="section-heading">tracks</h2>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-[#414247]/95 p-8 text-center">
          <p className="text-2xl">{event.tracks.description}</p>
          {event.tracks.items.length > 0 && <ul className="mt-6 grid gap-6 md:grid-cols-2">{event.tracks.items.map((track) => <li key={track.id}><h3 className="text-2xl font-bold">{track.name}</h3><p className="mt-3 leading-relaxed">{track.description}</p></li>)}</ul>}
        </div>
      </section>
      <section id="challenges" tabIndex={-1} aria-labelledby="prizes-title" className="section-shell pt-0">
        <h2 id="prizes-title" className="section-heading">prizes</h2>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-8 rounded-2xl bg-c15 p-8 sm:flex-row">
          <Image src={explorerDuck} alt="" className="h-auto w-40 shrink-0" sizes="160px" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-2xl">{event.prizes.description}</p>
            {event.prizes.items.length > 0 && <ul className="mt-6 space-y-6">{event.prizes.items.map((prize) => <li key={prize.id}><h3 className="text-xl font-bold">{prize.name}</h3><p>{prize.description}</p></li>)}</ul>}
          </div>
        </div>
      </section>
    </div>
  )
}
