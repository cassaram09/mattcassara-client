import React, { useEffect } from "react";
import "../assets/styles/main.scss";
import "react-google-places-autocomplete/dist/index.min.css";

import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import "focus-visible";
import { AuthProvider } from "../components/AuthProvider";
import Meta from "../components/Meta";
import { loadGoogleApis } from "../components/GoogleScripts";

export default function MyApp({ Component, pageProps, router }) {
  const { page } = pageProps;
  useEffect(() => {
    loadGoogleApis();
  }, []);

  return (
    <AuthProvider>
      <main className="app">
        <Meta page={page} />
        <Layout>
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
      </main>
    </AuthProvider>
  );
}
