import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Infrastructure as Text" key="title"/>
        <meta property="og:description" content="Write your AWS CDK code with GTP-3" key="description"/>
        <meta
          property="og:image"
          content="../public/twitter-card-image.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
