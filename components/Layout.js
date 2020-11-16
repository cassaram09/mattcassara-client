import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../components/AuthProvider";
import Loader from "./Loader";
import Router from "next/router";
import { useEffect } from "react";

Layout.propTypes = {
  children: PropTypes.node,
};

export default function Layout({ children }) {
  const auth = useAuth();

  // useEffect(() => {
  //   Router.events.on("routeChangeStart", (url) => {
  //     auth.setLoading(true);
  //   });
  //   Router.events.on("routeChangeComplete", (url) => {
  //     auth.setLoading(false);
  //   });
  // }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Loader visible={auth.loading} />
      {children}
      <Footer />
    </>
  );
}
