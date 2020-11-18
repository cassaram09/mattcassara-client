import styles from "../assets/styles/components/title.module.scss";
import { _classes } from "../utils/helpers";
import Reveal from "./Reveal";

const cl = _classes(styles);

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.boolean,
};

Title.defaultProps = {
  title: "",
};

export default function Title({ title, subtitle }) {
  return (
    <Reveal preset={"fadeUp"} delay={500} className={cl("_")}>
      {subtitle ? <h2>{title}</h2> : <h1>{title}</h1>}
    </Reveal>
  );
}
