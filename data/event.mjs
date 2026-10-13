// Update this file only with details approved by the event organizers.
const announcement = 'To be announced'

export const event = {
  name: 'hackTAMS',
  year: 2027,
  announcement,
  tagline: 'Create. Explore. Connect.',
  date: announcement,
  location: announcement,
  registration: { status: 'closed', url: null, deadline: announcement },
  logistics: {
    schedule: announcement,
    eligibility: announcement,
    cost: announcement,
    packing: announcement,
    teams: announcement,
    conductUrl: null,
  },
  about: {
    description: 'A hackathon brings people together to turn creative ideas into projects. Explore coding, solve problems, and share what you build with a community of curious makers.',
    note: 'Details for this year’s hackTAMS are still being planned. Check back here for confirmed announcements.',
  },
  program: [
    { id: 'workshops', title: 'workshops', description: announcement },
    { id: 'speakers', title: 'guest speakers', description: announcement },
    { id: 'activities', title: 'fun activities', description: announcement },
  ],
  tracks: { description: announcement, items: [] },
  prizes: { description: announcement, items: [] },
  speakers: { description: announcement, items: [] },
  sponsors: { description: announcement, items: [] },
  partners: { description: announcement, items: [] },
  // Leave unconfirmed URLs empty, including old invites, forms and donations.
  links: { email: null, instagram: null, discord: null, devpost: null, donation: null },
  // Set after organizers confirm the public URL, or use NEXT_PUBLIC_SITE_URL.
  siteUrl: null,
  socialImage: '/social-card.png',
}

export const eventTitle = `${event.name} ${event.year}`
export const registrationIsOpen = event.registration.status === 'open' && Boolean(event.registration.url)
export const registrationLabel = registrationIsOpen ? 'Register now' : 'Not yet open'
export const eventDescription = `${eventTitle}: ${event.tagline} Event date: ${event.date}. Location: ${event.location}. Registration: ${registrationLabel}.`

// FAQ answers use the same values shown elsewhere on the page.
export const faqs = [
  { id: 'hackathon', question: 'what is a hackathon?', answer: event.about.description },
  { id: 'date-location', question: 'when and where is the event?', answer: `Event date: ${event.date}. Location: ${event.location}. Schedule and check-in details: ${event.logistics.schedule}.` },
  { id: 'registration', question: 'when can i register?', answer: `Registration: ${registrationLabel}. Registration deadline: ${event.registration.deadline}.` },
  { id: 'eligibility', question: 'who can participate?', answer: `Eligibility and any consent requirements: ${event.logistics.eligibility}.` },
  { id: 'cost', question: 'are there any costs?', answer: `Participation costs and what is included: ${event.logistics.cost}.` },
  { id: 'packing', question: 'what should i bring?', answer: `Packing guidance: ${event.logistics.packing}.` },
  { id: 'teams', question: 'how do teams work?', answer: `Team sizes and team formation details: ${event.logistics.teams}.` },
  { id: 'experience', question: 'do i need coding experience?', answer: `Tracks and learning opportunities: ${event.tracks.description}.` },
  { id: 'updates', question: 'where can i find more information?', answer: 'Confirmed event details will be posted on this page. Contact channels: ' + (event.links.email || announcement) + '.' },
]
