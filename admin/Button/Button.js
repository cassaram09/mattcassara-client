import * as Icons from "@/admin/components/Icons";
import { _classes } from "@/utils/helpers";
import styles from "./button.module.scss";

const cl = _classes(styles);
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => null,
  icon: "",
  text: "Click me",
};

export default function Button({ text, icon, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={cl(["button is-info", "_"])}
      style={{ color, fill: color }}
    >
      <span>{text}</span>
      <span>{Icons[icon]}</span>
    </button>
  );
}
