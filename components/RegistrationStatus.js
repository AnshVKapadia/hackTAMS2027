import { event, registrationIsOpen, registrationLabel } from '../data/event.mjs'

export default function RegistrationStatus() {
  return registrationIsOpen ? (
    <a className="inline-block rounded-full bg-[#556b2f] px-6 py-3 font-bold text-white hover:bg-[#1c4026]" href={event.registration.url}>
      {registrationLabel}
    </a>
  ) : (
    <p className="inline-block rounded-full bg-[#556b2f] px-6 py-3 font-bold text-white">Registration: {registrationLabel}</p>
  )
}
