import { useEffect } from "react";
import { motion, AnimatePresence } from "@/utils/FramerMotion";
import { _classes } from "@/utils/helpers";
import styles from "./notification.module.scss";

const cl = _classes(styles);

Notification.propTypes = {
  close: PropTypes.func,
  notification: PropTypes.object,
};

const variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

export default function Notification({ notification, close }) {
  useEffect(() => {
    notification && setTimeout(close, 3000);
  }, [notification]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={"notification-" + notification.type}
          variants={variants}
          initial={"hidden"}
          animate={"visible"}
          exit={{ opacity: 0 }}
          className={cl([`notification`, `is-${notification.type}`, "_"])}
          style={{ zIndex: 3000 }}
        >
          <button className="delete" onClick={close}></button>
          <p>{notification.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
