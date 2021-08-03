import styles from "./tooltip.module.scss";
import { _classes } from "@/utils/helpers";

const cl = _classes(styles);

ToolTip.propTypes = {
  text: PropTypes.string,
  position: PropTypes.string,
};

ToolTip.defaultProps = {
  position: "right",
};

export default function ToolTip({ text, position }) {
  return (
    <div className={cl(["_"])}>
      <span className={cl(["tag", "is-black", position])}>{text}</span>
    </div>
  );
}
