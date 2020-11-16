import styles from "../assets/styles/components/nav.module.scss";
import { _classes } from "../utils/helpers";
import Link from "./Link";
import Hamburger from "./Hamburger";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useAuth from "../components/AuthProvider";
import * as SVG from "./SVG";
import SearchForm from "../forms/SearchForm";
import { useRouter } from "next/router";

const cl = _classes(styles);

Nav.propTypes = {
  items: PropTypes.array,
  scrolled: PropTypes.bool,
};

Nav.defaultProps = {
  items: [],
};

export default function Nav({ items, scrolled }) {
  const auth = useAuth();
  const router = useRouter();

  const [open, toggleNav] = useState(false);
  const [searchOpen, toggleSearch] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      toggleSearch(false);
    });
  }, []);

  useEffect(() => {
    controls.start(open ? "visible" : "hidden");
    open ? disableBodyScroll() : enableBodyScroll();
  });

  const renderCTA = () => {
    const path = auth.isAuthenticated ? "/account" : "/login";
    const title = auth.isAuthenticated ? "Account" : "Login";
    return (
      <div className={cl("mobile_cta")}>
        <Link path={path} title={title} />
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={cl("search_container")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={cl("search_container__inner")}>
              <SearchForm
                onSelect={({ id }) => router.push(`/properties/${id}`)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const desktopNav = () => (
    <div className={cl(["desktop_nav", scrolled && "scrolled"])}>
      <ul className={cl("list")}>
        <li className={cl(["list__item", "search"])}>
          <Link onClick={() => toggleSearch(!searchOpen)}>
            {SVG.searchIcon}
          </Link>
        </li>
        {items.map((item, i) => (
          <li className={cl("list__item")} key={i}>
            <Link {...item} />
          </li>
        ))}
      </ul>
    </div>
  );

  const mobileNav = () => {
    return (
      <div className={cl("mobile_nav")}>
        <li className={cl(["list__item", "search"])}>
          <Link onClick={() => toggleSearch(!searchOpen)}>
            {SVG.searchIcon}
          </Link>
        </li>
        {renderCTA()}
        <Hamburger onClick={() => toggleNav(!open)} open={open} />

        <AnimatePresence>
          {open && (
            <motion.div
              className={cl("mobile_nav__pane")}
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.ul
                className={cl("list")}
                variants={mobileNavListVariatnts}
                initial={"hidden"}
                animate={controls}
              >
                {items.map((item, i) => (
                  <motion.li
                    className={cl("list__item")}
                    key={i}
                    variants={mobileNavItemsVariants}
                    initial={"hidden"}
                  >
                    <Link {...item} onClick={() => toggleNav(false)} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav className={cl(["_"])}>
      {desktopNav()}
      {mobileNav()}
      {renderSearch()}
    </nav>
  );
}

const mobileNavVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.75,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const mobileNavListVariatnts = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
      delay: 0.25,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const mobileNavItemsVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
