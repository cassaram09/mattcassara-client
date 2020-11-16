import { motion, AnimatePresence } from "framer-motion";
import { _classes } from "../utils/helpers";
import styles from "../assets/styles/components/modal.module.scss";
import Hamburger from "./Hamburger";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect } from "react";

const cl = _classes(styles);

Modal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  close: PropTypes.func.isRequired,
};

function Modal({ visible, children, close }) {
  useEffect(() => {
    visible ? disableBodyScroll() : enableBodyScroll();
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cl("_")}
        >
          <div className={cl("container")}>
            <div className={cl("close")}>
              <Hamburger onClick={close} open={true} color="white" />
            </div>
            <div className={cl("content")}>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
