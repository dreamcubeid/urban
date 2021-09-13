/* Library Package */
import { FC, ReactNode } from 'react'
import Head from 'next/head'

type SEOProps = {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  hideFromSearchEngine?: boolean
  children?: ReactNode
}

const SEOHead: FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  hideFromSearchEngine,
  children
}) => (
  <Head>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
    {hideFromSearchEngine && (
      <meta name="robots" content="noindex, nofollow" />
    )}

    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="twitter:title" content={title} key="twittertitle" />
      </>
    )}

    {description && (
      <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} key="ogdescription" />
        <meta property="twitter:description" content={description} key="twitterdescription" />
      </>
    )}

    {image && (
      <>
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="twitter:image" content={image} key="twitterimage" />
        <meta property="twitter:card" content="summary" />
      </>
    )}

    {url && (
      <>
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="twitter:url" content={url} key="twitterurl" />
      </>
    )}

    {keywords && 
      <meta name="keyword" content={keywords} />
    }

    <link rel="manifest" href="/manifest.json" />

    <link
      rel="preload"
      href="webfonts/DMSans-Bold.ttf"
      as="font"
      crossOrigin="anonymous"
    />

    <link
      rel="preload"
      href="webfonts/DMSans-Regular.ttf"
      as="font"
      crossOrigin="anonymous"
    />

    <link
      rel="preload"
      href="webfonts/DMSans-Medium.ttf"
      as="font"
      crossOrigin="anonymous"
    />
    
    <link rel="preconnect" href="https://thumbor.sirclocdn.com" />
    <link rel="preconnect" href={process.env.IS_PROD == "true" ?
        "http://cdn.sirclo.com" :
        "http://cdn.sirclo.com.dmmy.me"} />
    
    <link
      rel="dns-prefetch"
      href={process.env.IS_PROD == "true" ?
        "http://cdn.sirclo.com" :
        "http://cdn.sirclo.com.dmmy.me"}
    />

    <link rel="dns-prefetch" href="https://storage.googleapis.com" />
    <link rel="dns-prefetch" href="https://thumbor.sirclocdn.com" />
    
    {children}

  </Head>
)

export default SEOHead