import styles from "../assets/styles/components/hamburger.module.scss";
import { _classes } from "../utils/helpers";

const cl = _classes(styles);

Hamburger.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};

Hamburger.defaultProps = {
  open: false,
  onClick: () => null,
  className: "",
  color: "white",
  type: "",
};

export default function Hamburger({ open, onClick, className, color, type }) {
  return (
    <button className={cl(["_", color, className, type])} onClick={onClick}>
      <div className={cl(["line", open ? "line_1" : ""])} />
      <div className={cl(["line", open ? "line_2" : ""])} />
      <div className={cl(["line", open ? "line_3" : ""])} />
    </button>
  );
}
