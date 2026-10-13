import Image from 'next/image'

export default function AboutItem({ title, image, description }) {
  return (
    <article className="flex flex-col items-center rounded-3xl bg-[#556b2f] p-6 text-center text-white">
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="my-6 w-full max-w-[220px]">
        <Image src={image} alt="" className="h-auto w-full" sizes="220px" />
      </div>
      <p className="mt-auto text-lg leading-relaxed">{description}</p>
    </article>
  )
}
