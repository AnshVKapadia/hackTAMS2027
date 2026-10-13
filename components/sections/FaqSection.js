import Image from 'next/image'
import dinosaurDuck from '../../public/images/dinoDuck.PNG'
import FaqDropdown from '../faq'
import { faqs } from '../../data/event.mjs'

export default function FaqSection() {
  return (
    <section id="faq" tabIndex={-1} aria-labelledby="faq-title" className="bg-c15 text-white">
      <div className="section-shell">
        <h2 id="faq-title" className="section-heading">faq</h2>
        <div className="mt-8 flex items-start gap-8">
          <Image src={dinosaurDuck} alt="" className="mt-12 hidden h-auto w-40 lg:block" sizes="160px" />
          <div className="min-w-0 flex-1 space-y-4">
            {faqs.map((faq) => <FaqDropdown key={faq.id} faq={faq} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
