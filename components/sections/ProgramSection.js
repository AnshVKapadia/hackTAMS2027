import AboutItem from '../about'
import workshops from '../../public/images/workshops.PNG'
import speakers from '../../public/images/GuestSpeaker1.PNG'
import activities from '../../public/images/FunActivities.PNG'
import { event } from '../../data/event.mjs'

const artwork = { workshops, speakers, activities }

export default function ProgramSection() {
  return (
    <section id="program" tabIndex={-1} aria-labelledby="program-title" className="section-shell pt-0">
      <h2 id="program-title" className="section-heading text-[#556b2f]">events</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {event.program.map((item) => (
          <AboutItem key={item.id} title={item.title} image={artwork[item.id]} description={item.id === 'speakers' ? event.speakers.description : item.description} />
        ))}
      </div>
      {event.speakers.items.length > 0 && (
        <ul className="mt-6 grid gap-4 text-[#1c4026] md:grid-cols-2">
          {event.speakers.items.map((speaker) => <li key={speaker.id} className="rounded-xl bg-white p-6"><h3 className="text-xl font-bold">{speaker.name}</h3><p>{speaker.description}</p></li>)}
        </ul>
      )}
    </section>
  )
}
