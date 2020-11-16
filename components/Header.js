import styles from "../assets/styles/components/header.module.scss";
import { _classes } from "../utils/helpers";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import zenscroll from "zenscroll";
import useAuth from "../components/AuthProvider";
import Link from "./Link";
const cl = _classes(styles);

Header.propTypes = {};

Header.defaultProps = {};

const NAV = [
  { title: "Sign Up", path: "/signup" },
  { title: "Login", path: "/login" },
  { title: "Post a Review", path: "/post-review" },
];

const AUTH_NAV = [
  { title: "Account", path: "/account" },
  { title: "Post a Review", path: "/post-review" },
];

export default function Header() {
  const auth = useAuth();

  const [scrolled, setScroll] = useState(false);

  const offsetY = () => setScroll(zenscroll.getY() > 70);

  useEffect(() => window.addEventListener("scroll", offsetY), []);

  return (
    <header className={cl(["_", scrolled && "scrolled"])}>
      <div className={cl("container")}>
        <div className={cl("logo")}>
          <Link path={"/"}>
            <a>LandlordGrades</a>
          </Link>
        </div>
        <Nav
          items={auth.isAuthenticated ? AUTH_NAV : NAV}
          scrolled={scrolled}
        />
      </div>
    </header>
  );
}
