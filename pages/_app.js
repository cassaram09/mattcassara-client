import { useEffect } from "react";
import "../utils/ProxyPolyfill";
import "../assets/styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "../components/Head";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import SiteLoader from "../components/SiteLoader";
import API from "../utils/API";
import { AppProvider, ViewportProvider } from "@/providers";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

App.propTypes = {
  nav: PropTypes.object,
};

export default function App({ Component, pageProps, router, nav, global }) {
  const _props = {
    router,
    Component,
    nav,
    global,
    ...pageProps,
  };

  useEffect(() => setTimeout(() => window.scroll(0, 0), 500), []);

  return (
    <ViewportProvider>
      <AppProvider {..._props}>
        <Head page={_props.page} global={global} />
        <Layout nav={nav} global={global} {...pageProps}>
          <SiteLoader />
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
      </AppProvider>
    </ViewportProvider>
  );
}
