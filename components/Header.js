import styles from "../assets/styles/components/header.module.scss";
import { _classes } from "../utils/helpers";
import * as SVG from "./SVG";
import Link from "next/link";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import zenscroll from "zenscroll";

const cl = _classes(styles);

Header.propTypes = {
  nav: PropTypes.object,
};

Header.defaultProps = {
  nav: {},
};

export default function Header({ nav }) {
  const [scrolled, setScroll] = useState(false);

  const offsetY = () => setScroll(zenscroll.getY() > 70);

  useEffect(() => window.addEventListener("scroll", offsetY), []);

  return (
    <header className={cl(["_", scrolled && "scrolled"])}>
      <div className={cl("inner")}>
        <div className={cl("container")}>
          <div className={cl("logo")}>
            <Link href={{ pathname: `/` }}>
              <p>MWC</p>
            </Link>
          </div>
          <Nav items={nav.menu_items} scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
