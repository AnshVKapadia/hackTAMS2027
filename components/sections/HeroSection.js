import Image from 'next/image'
import introDuck from '../../public/images/introDuckJungle.png'
import { event } from '../../data/event.mjs'
import RegistrationStatus from '../RegistrationStatus'

export default function HeroSection() {
  return (
    <section id="home" tabIndex={-1} aria-labelledby="event-title" className="hero-background relative flex min-h-[760px] flex-col items-center px-4 pb-12 pt-36 text-center sm:pt-40">
      <h1 id="event-title" className="text-6xl font-black leading-tight text-white drop-shadow-lg sm:text-7xl md:text-8xl lg:text-[120px]">
        {event.name}<span className="block">{event.year}</span>
      </h1>
      <div className="mt-6 rounded-2xl bg-[#f7f5ed]/95 px-5 py-5 text-[#1c4026] shadow-sm sm:px-8">
        <p className="text-xl font-bold sm:text-2xl">{event.tagline}</p>
        <dl className="mt-4 space-y-2 text-lg">
          <div><dt className="inline font-bold">Event date: </dt><dd className="inline">{event.date}</dd></div>
          <div><dt className="inline font-bold">Location: </dt><dd className="inline">{event.location}</dd></div>
        </dl>
        <div className="mt-5"><RegistrationStatus /></div>
      </div>
      <div className="mt-6 w-56 sm:w-64">
        <Image src={introDuck} alt="" className="h-auto w-full" sizes="256px" preload />
      </div>
    </section>
  )
}
