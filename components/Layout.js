import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

Layout.propTypes = {
  nav: PropTypes.object,
  children: PropTypes.node,
};

export default function Layout({ children, nav }) {
  return (
    <>
      <Head>
        <title>Matt Cassara</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header nav={nav} />

      {children}

      <Footer />
    </>
  );
}
