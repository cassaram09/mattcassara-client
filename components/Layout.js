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

export default function Layout({ children, nav, global }) {
  return (
    <>
      <Header nav={nav} />

      {children}

      <Footer global={global} />
    </>
  );
}
