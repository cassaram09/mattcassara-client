import React from "react";
import App from "next/app";
import "../utils/ProxyPolyfill";
import "../assets/styles/main.scss";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import SiteLoader from "../components/SiteLoader";
import API from "../utils/api";

export default class _App extends App {
  static propTypes = {
    nav: PropTypes.object,
  };

  static getInitialProps = async ({ Component, ctx }) => {
    const data = await new API().graphql({
      query: `
        query GetMenu{
          menu {
            menu_items {
              title
              path
            }
          }
        }
        `,
    });

    return { nav: data.menu };
  };

  render() {
    const { Component, pageProps, router, nav } = this.props;

    return (
      <div className="app">
        <SiteLoader />
        <Layout nav={nav}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="page"
            >
              <Component {...pageProps} key={router.route} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </div>
    );
  }
}
