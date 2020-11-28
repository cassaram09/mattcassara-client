import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { _classes } from "../utils/helpers";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../assets/styles/components/modal.module.scss";
import { close as closeIcon } from "./SVG";

const cl = _classes(styles);

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  close: PropTypes.func,
  className: PropTypes.string,
};

Modal.defaultProps = {
  open: false,
  close: () => null,
  className: "",
};

export default function Modal({ children, open, close, className }) {
  useEffect(() => {
    window.addEventListener("keydown", toggleEsc);

    return function cleanup() {
      window.removeEventListener("keydown", toggleEsc);
      enableBodyScroll();
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    open ? disableBodyScroll(body) : enableBodyScroll(body);
  });

  const toggleEsc = (e) => {
    if (open && e.keyCode == 27) {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${cl("_")} ${className}`}
          onClick={(e) => {
            if (e.target.classList.contains(cl(""))) {
              close();
            }
          }}
        >
          <div
            className={cl("container")}
            aria-label="alertdialog"
            tabIndex="1"
          >
            <div className={cl("close")} onClick={close}>
              <div>{closeIcon}</div>
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
