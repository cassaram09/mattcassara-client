import Title from "./Title";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import styles from "../assets/styles/components/skills.module.scss";
import { _classes } from "../utils/helpers";
import * as SVG from "./SVG";

const cl = _classes(styles);

Skills.propTypes = {
  skills: PropTypes.array,
};

Skills.defaultProps = {
  skills: [],
};

export default function Skills({ skills }) {
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
    <div className={cl("_")}>
      <Title title={"Skills"} tag={"h2"} />

      <Reveal preset={"fadeUp"} delay={250}>
        <p>Including, but not limited to...</p>
      </Reveal>

      <Reveal className={cl("list")} element={"ul"} variants={list}>
        {skills.map((skill) => {
          const item = {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          };

          return (
            <motion.li
              className={cl("list__item")}
              key={skill.id}
              variants={item}
            >
              <div className={cl("list__item__icon")}>{SVG[skill.icon]}</div>
              <p className={cl("list__item__title")}>{skill.title}</p>
            </motion.li>
          );
        })}
      </Reveal>
    </div>
  );
}
