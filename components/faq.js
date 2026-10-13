export default function FaqDropdown({ faq }) {
  return (
    <details className="faq">
      <summary className="cursor-pointer rounded-lg p-5 text-lg font-bold sm:text-xl">{faq.question}</summary>
      <p className="px-5 pb-5 leading-relaxed">{faq.answer}</p>
    </details>
  )
}
