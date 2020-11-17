import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://www.mattcassara.com/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
