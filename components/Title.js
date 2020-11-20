import styles from "../assets/styles/components/title.module.scss";
import { _classes } from "../utils/helpers";
import Reveal from "./Reveal";

const cl = _classes(styles);

Title.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h4", "h6", "h6"]),
};

Title.defaultProps = {
  title: "",
  tag: "h1",
};

const TAGS = {
  h1: (title) => <h1>{title}</h1>,
  h2: (title) => <h2>{title}</h2>,
  h3: (title) => <h3>{title}</h3>,
  h4: (title) => <h4>{title}</h4>,
  h5: (title) => <h5>{title}</h5>,
  h6: (title) => <h6>{title}</h6>,
};

export default function Title({ title, tag }) {
  return (
    <Reveal preset={"fadeUp"} delay={500} className={cl("_")}>
      {TAGS[tag](title)}
    </Reveal>
  );
}
