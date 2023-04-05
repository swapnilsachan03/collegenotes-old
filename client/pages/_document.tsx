import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../config/theme"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon integration and manifest */}

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Basic meta tags */}

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>

        {/* Metadata for Open Graph protocol. See http://ogp.me/. */}

        <meta property='og:type' content='website'/>
        <meta property='og:url' content='https://www.collegenotes.co.in'/>
        <meta property='og:site_name' content='CollegeNotes'/>
        <meta property="og:image" content="/images/title-image.jpg" />

        {/* Twitter meta tags */}

        <meta content='summary_large_image' name='twitter:card'/>
        <meta content='collegenotes.co.in/' name='twitter:domain'/>
        <meta content='https://www.collegenotes.co.in/' name='twitter:url'/>
        <meta name="twitter:image" content="/images/title-image.jpg" />

        {/* Import Google Fonts */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway:wght@200&family=Poppins:wght@700&family=Roboto:wght@400;700&family=Roboto+Condensed&family=Source+Serif+Pro:wght@700;900&display=swap" rel="stylesheet" />
      </Head>
      
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}