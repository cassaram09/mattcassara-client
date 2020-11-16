import styles from "../assets/styles/components/title.module.scss";
import { _classes } from "../utils/helpers";
import { motion } from "framer-motion";

const cl = _classes(styles);

Title.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
};

Title.defaultProps = {
  title: "",
  color: "",
};

export default function Title({ title, color }) {
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  };

  return (
    <motion.div
      className={cl("_")}
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
    >
      <h1 className={cl([color])}>{title}</h1>
    </motion.div>
  );
}
