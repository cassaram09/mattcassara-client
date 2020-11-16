import styles from "../assets/styles/components/site-loader.module.scss";
import { _class } from "../utils/helpers";
import { motion } from "framer-motion";

const cl = _class(styles, "site_loader");

class SiteLoader extends React.Component {
  render() {
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
          <p>MWC</p>
        </div>
      </motion.div>
    );
  }
}

export default SiteLoader;
