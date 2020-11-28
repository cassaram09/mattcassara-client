import styles from "../assets/styles/components/nav.module.scss";
import { _classes } from "../utils/helpers";
import Link from "./Link";
import Hamburger from "./Hamburger";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const cl = _classes(styles);

Nav.propTypes = {
  items: PropTypes.array,
  scrolled: PropTypes.bool,
};

Nav.defaultProps = {
  items: [],
};

export default function Nav({ items, scrolled }) {
  const [open, toggleNav] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const body = document.querySelector("body");
    controls.start(open ? "visible" : "hidden");
    open ? disableBodyScroll(body) : enableBodyScroll(body);
  });

  const desktopNav = () => (
    <div className={cl(["desktop_nav", scrolled && "scrolled"])}>
      <ul className={cl("list")}>
        {items.map((item, i) => (
          <li className={cl("list__item")} key={i}>
            <Link title={item.title} path={item.path} />
          </li>
        ))}
      </ul>
    </div>
  );

  const mobileNav = () => {
    return (
      <div className={cl("mobile_nav")}>
        <Hamburger onClick={() => toggleNav(!open)} open={open} />

        <motion.div
          className={cl("mobile_nav__pane")}
          variants={mobileNavVariants}
          initial={"hidden"}
          animate={controls}
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
                <Link
                  title={item.title}
                  path={item.path}
                  onClick={() => toggleNav(false)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    );
  };

  return (
    <nav className={cl(["_"])}>
      {desktopNav()}
      {mobileNav()}
    </nav>
  );
}

const mobileNavVariants = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      delay: 1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
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
