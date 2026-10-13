import Image from 'next/image'
import community from '../../public/images/hacktams2024collage2.png'
import { event } from '../../data/event.mjs'

export default function AboutSection() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="section-shell">
      <h2 id="about-title" className="section-heading text-[#556b2f]">about</h2>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
        <figure className="mx-auto w-full max-w-md">
          <Image src={community} alt="Collage of participants collaborating and presenting projects at a previous hackTAMS event" className="h-auto w-full rounded-2xl" sizes="(max-width: 976px) 90vw, 448px" />
          <figcaption className="mt-2 text-center text-sm text-[#1c4026]">A look back at the hackTAMS community.</figcaption>
        </figure>
        <div className="rounded-2xl bg-[#556b2f] p-6 text-lg leading-relaxed text-white sm:p-8">
          <p>{event.about.description}</p>
          <p className="mt-4">{event.about.note}</p>
        </div>
      </div>
    </section>
  )
}
