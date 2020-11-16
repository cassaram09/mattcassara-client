import { _classes } from "../utils/helpers";
import styles from "../assets/styles/components/loader.module.scss";
import { buildingIcon } from "./SVG";
const cl = _classes(styles);

Loader.propTypes = {
  visible: PropTypes.bool,
};

export default function Loader({ visible }) {
  return (
    <div className={cl(["_", visible && "active"])}>
      <div className={cl("inner")}>{buildingIcon}</div>
    </div>
  );
}
