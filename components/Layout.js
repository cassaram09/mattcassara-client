import Footer from "./Footer";
import Header from "./Header";
import { _classes } from "../utils/helpers";
import styles from "../assets/styles/components/layout.module.scss";
import { useAppState } from "@/providers";
import AdminPanel from "./AdminPanel";

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
  const { enabled } = useAppState();

  return (
    <div className={cl("_")}>
      <AdminPanel enabled={enabled} />

      <div className={cl("content")}>
        <Header nav={nav} />

        {children}

        <Footer global={global} />
      </div>
    </div>
  );
}
