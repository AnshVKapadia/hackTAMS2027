import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/900.css'
import '../styles/globals.css'

import Head from 'next/head'
import { event, eventTitle, eventDescription } from '../data/event.mjs'
import { getSiteUrl } from '../utils/site-url.mjs'

const siteUrl = getSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || event.siteUrl)
const socialImageUrl = siteUrl ? new URL(event.socialImage, siteUrl).href : null

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{eventTitle}</title>
        <meta name="description" content={eventDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={event.name} />
        <meta property="og:title" content={eventTitle} />
        <meta property="og:description" content={eventDescription} />
        <meta name="twitter:card" content={socialImageUrl ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={eventTitle} />
        <meta name="twitter:description" content={eventDescription} />
        {siteUrl && <link rel="canonical" href={siteUrl} />}
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        {socialImageUrl && <meta property="og:image" content={socialImageUrl} />}
        {socialImageUrl && <meta property="og:image:width" content="1200" />}
        {socialImageUrl && <meta property="og:image:height" content="630" />}
        {socialImageUrl && <meta property="og:image:alt" content={`${eventTitle} — ${event.tagline}`} />}
        {socialImageUrl && <meta name="twitter:image" content={socialImageUrl} />}
        {socialImageUrl && <meta name="twitter:image:alt" content={`${eventTitle} — ${event.tagline}`} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#556b2f" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
