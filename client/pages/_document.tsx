import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../config/theme"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

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