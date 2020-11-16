import styles from "../assets/styles/components/footer.module.scss";
import { _classes } from "../utils/helpers";
import * as SVG from "./SVG";
import Link from "./Link";

const cl = _classes(styles);

Footer.propTypes = {};

Footer.defaultProps = {};

export default function Footer() {
  return (
    <footer className={cl("_")}>
      <div className={cl("container")}>
        <div className={cl("copyright")}>
          <p>© 2020 LandlordGrades. All rights reserved.</p>
        </div>
        <ul className={cl("social")}>
          <li className={cl("social__item")}>
            <Link external={"https://www.instagram.com"}>{SVG.instagram}</Link>
          </li>
          <li className={cl("social__item")}>
            <Link external={"https://www.twitter.com"}>{SVG.twitter}</Link>
          </li>
          <li className={cl("social__item")}>
            <Link external={"https://www.facebook.com"}>{SVG.facebook}</Link>
          </li>
        </ul>
        <ul className={cl("links")}>
          <li className={cl("links__item")}>
            <Link title="Terms of Service" path={"/terms"} />
          </li>
          <li className={cl("links__item")}>
            <Link title="About" path={"/about"} />
          </li>
          <li className={cl("links__item")}>
            <Link title="Contact" path={"/contact"} />
          </li>
        </ul>
      </div>
    </footer>
  );
}
