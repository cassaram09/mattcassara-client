import styles from "../assets/styles/components/footer.module.scss";
import { _classes } from "../utils/helpers";
import * as SVG from "./SVG";

const cl = _classes(styles);

class Footer extends React.Component {
  render() {
    return (
      <footer className={cl("_")}>
        <div className={cl("container")}>
          <div className={cl("copyright")}>
            <span>© 2020 Matt Cassara. All rights reserved</span>
          </div>
          <ul className={cl("social")}>
            <li className={cl("social__item")}>{SVG.github}</li>
            <li className={cl("social__item")}>{SVG.linkedin}</li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
