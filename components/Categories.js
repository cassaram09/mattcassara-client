import styles from "../assets/styles/components/categories.module.scss";
import { _class } from "../utils/helpers";
import { motion, useAnimation } from "framer-motion";
import ScrollContainer from "./ScrollContainer";

const cl = _class(styles, "categories");

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
        staggerChildren: 0.4,
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

  const controls = useAnimation();

  return (
    <ScrollContainer onEnter={() => controls.start("visible")}>
      <motion.ul
        className={cl("")}
        variants={list}
        initial={"hidden"}
        animate={controls}
      >
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
      </motion.ul>
    </ScrollContainer>
  );
}
