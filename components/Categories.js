import styles from "../assets/styles/components/categories.module.scss";
import { _classes } from "../utils/helpers";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const cl = _classes(styles);

Categories.propTypes = {
  categories: PropTypes.array,
};

Categories.defaultProps = {
  categories: [],
};

export default function Categories({ categories }) {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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

  return (
    <Reveal className={cl("_")} element={"ul"} variants={list}>
      {categories.map((cat) => {
        const item = {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        };

        return (
          <motion.li variants={item} key={cat.id} className={cl("tag")}>
            <span>{cat.title}</span>
          </motion.li>
        );
      })}
    </Reveal>
  );
}
