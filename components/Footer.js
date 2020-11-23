import styles from "../assets/styles/components/footer.module.scss";
import { _classes } from "../utils/helpers";
import * as SVG from "./SVG";

const cl = _classes(styles);

export default function Footer({ global }) {
  return (
    <footer className={cl("_")}>
      <div className={cl("container")}>
        <div className={cl("copyright")}>
          <span>© 2020 Matt Cassara. All rights reserved</span>
        </div>
        <ul className={cl("social")}>
          <li className={cl("social__item")}>
            <a href={global.github_url} target="_blank">
              {SVG.github}
            </a>
          </li>
          <li className={cl("social__item")}>
            <a href={global.linkedin_url} target="_blank">
              {SVG.linkedin}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
