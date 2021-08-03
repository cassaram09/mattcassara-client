import { _classes } from "@/utils/helpers";
import { useEffect } from "react";
import { AnimatePresence, motion } from "@/utils/FramerMotion";
import styles from "./modal.module.scss";
import { useAdminContext } from "@/admin";

const cl = _classes(styles);

Modal.propTypes = {};

export default function Modal() {
  const { children, visible, closeModal } = useAdminContext();
  useEffect(() => {
    window.addEventListener("keydown", toggleEsc);

    return function cleanup() {
      window.removeEventListener("keydown", toggleEsc);
    };
  }, []);

  const toggleEsc = (e) => e.keyCode == 27 && closeModal();

  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <motion.div
          initial={{ opacity: 0, transition: { duration: 0.25 } }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className={cl(["_", visible && "open"])}
          onClick={(e) => {
            // no IE11 support: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
            if (e.target.classList && e.target.classList.contains(cl("_"))) {
              closeModal();
            }
          }}
        >
          <div
            className={cl("container")}
            aria-label="alertdialog"
            tabIndex="1"
            role="dialog"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
