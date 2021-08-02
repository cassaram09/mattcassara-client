import Footer from "./Footer";
import Header from "./Header";
import { _classes } from "../utils/helpers";
import styles from "../assets/styles/components/layout.module.scss";

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
  return (
    <div className={cl("_")}>
      <div className={cl("content")}>
        <Header nav={nav} />

        {children}

        <Footer global={global} />
      </div>
    </div>
  );
}
