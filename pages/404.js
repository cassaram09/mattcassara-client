import styles from "../assets/styles/pages/404.module.scss";
import { _classes } from "../utils/helpers";

import Title from "../components/Title";

const cl = _classes(styles);

_404.propTypes = {};

_404.defaultProps = {};

export default function _404() {
  return (
    <main className={cl("_")}>
      <div className={cl("container")}>
        <div className={cl("title")}>
          <Title title={"404"} />
          <Title title={"Page not found"} tag={"h2"} />
        </div>
      </div>
    </main>
  );
}
