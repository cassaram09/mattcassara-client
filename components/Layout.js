import Footer from "../components/Footer";
import Header from "../components/Header";
import { _classes } from "../utils/helpers";
import styles from "../assets/styles/components/layout.module.scss";
import { useAppState } from "@/providers";
import { AnimatePresence, motion } from "@/utils/FramerMotion";

const cl = _classes(styles);
Layout.propTypes = {
  nav: PropTypes.object,
  global: PropTypes.object,
  children: PropTypes.node,
  page: PropTypes.object,
};

Layout.defaultProps = {
  page: {},
};

export default function Layout({ children, nav, global }) {
  const {
    setActiveField,
    activeField,
    page,
    enabled,
    toggle,
    updateField,
    save,
  } = useAppState();

  console.log(page);
  return (
    <div className={cl("_")}>
      <AnimatePresence exitBeforeEnter>
        {enabled && (
          <motion.div
            key="admin"
            animate={{ x: 0 }}
            initial={{ x: -400 }}
            exit={{ x: -400 }}
            transition={{ easing: "ease-in-out", duration: 0.5 }}
            className={cl(["admin", enabled && "active"])}
          >
            <textarea
              style={{ color: "#000" }}
              value={page[activeField]}
              onChange={(e) => updateField(e.target.value)}
            ></textarea>
            <button onClick={save}>Save changes</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cl("content")}>
        <button
          className={cl("toggle")}
          onClick={() => {
            toggle(!enabled);
            setActiveField(null);
          }}
        >
          Toggle
        </button>
        <Header nav={nav} />

        {children}

        <Footer global={global} />
      </div>
    </div>
  );
}
