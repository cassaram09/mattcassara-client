import { useEffect } from "react";
import "../utils/ProxyPolyfill";
import "../assets/styles/main.scss";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import SiteLoader from "../components/SiteLoader";
import API from "../utils/API";

App.propTypes = {
  nav: PropTypes.object,
};

App.getInitialProps = async ({ Component, ctx }) => {
  const data = await new API().graphql({
    query: `
      query GetMenu{
        menu {
          menu_items {
            title
            path
          }
        }
        global {
          github_url
          linkedin_url
        }
      }
      `,
  });

  return { nav: data.menu, global: data.global };
};

export default function App({ Component, pageProps, router, nav, global }) {
  useEffect(() => setTimeout(() => window.scroll(0, 0), 500), []);

  return (
    <div className="app">
      <SiteLoader />
      <Layout nav={nav} global={global}>
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
