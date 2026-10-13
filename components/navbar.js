import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import navDuck from '../public/images/navDuck.PNG'
import { event, eventTitle } from '../data/event.mjs'

const navigation = [
  ['about', 'about'], ['program', 'events'], ['tracks', 'tracks'],
  ['challenges', 'prizes'], ['faq', 'faq'], ['sponsors', 'sponsors'],
  ['registration', 'registration'],
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 976px)')
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [isOpen])

  const closeAfterNavigation = (id) => {
    setIsOpen(false)
    document.getElementById(id)?.focus({ preventScroll: true })
  }

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <a href="#home" aria-label={`${eventTitle} home`} className="flex items-center gap-3 font-black text-white" onClick={() => closeAfterNavigation('home')}>
          <Image src={navDuck} alt="" className="h-12 w-12 object-contain" sizes="48px" />
          <span className="text-lg">{event.name}</span>
        </a>
        <button ref={menuButtonRef} type="button" className="rounded-lg border border-white/60 px-4 py-2 font-bold text-white lg:hidden"
          aria-controls="navigation-links" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? 'Close menu' : 'Menu'}
        </button>
        <ul id="navigation-links" className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pb-2 text-white lg:flex lg:w-auto lg:flex-row lg:gap-1 lg:pb-0`}>
          {navigation.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-lg px-3 py-3 font-bold hover:bg-white/15" onClick={() => closeAfterNavigation(id)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
