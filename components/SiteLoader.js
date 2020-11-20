import styles from "../assets/styles/components/site-loader.module.scss";
import { _class } from "../utils/helpers";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const cl = _class(styles, "site_loader");

export default function SiteLoader() {
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

  const item = [
    {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  ];

  return (
    <motion.div
      className={cl("")}
      style={{
        position: "fixed",
        zIndex: 5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "#181818",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1, delay: 2 }}
    >
      <div className={cl("content")}>
        <Reveal element={"ul"} variants={list}>
          {["M", "W", "C"].map((letter, index) => (
            <motion.li element={"li"} variants={item[index]} key={"letter"}>
              <p>{letter}</p>
            </motion.li>
          ))}
        </Reveal>
      </div>
    </motion.div>
  );
}
