import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

Layout.propTypes = {
  nav: PropTypes.object,
  global: PropTypes.object,
  children: PropTypes.node,
  page: PropTypes.object,
};

Layout.defaultProps = {
  page: {},
};

export default function Layout({ children, nav, global, page }) {
  return (
    <>
      <Head>
        <title>{page.title || "Matt Cassara"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content={`Matt Cassara - Full Stack Web Developer.`}
        />

        <meta charSet="utf-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <link rel="canonical" href={`https://www.mattcassara.com`} />

        <link rel="icon" type="image/ico" href={"/favicon.ico"} />
      </Head>

      <Header nav={nav} />

      {children}

      <Footer global={global} />
    </>
  );
}
