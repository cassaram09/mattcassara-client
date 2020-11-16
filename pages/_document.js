import Document, { Html, Head, Main, NextScript } from "next/document";
import GoogleAnalytics from "../components/GoogleAnalytics";

export default class _Document extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="canonical" href="https://landlordgrades.com/" />
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
