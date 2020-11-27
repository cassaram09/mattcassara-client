import Link from "./Link";
import styles from "../assets/styles/components/cta.module.scss";
import { _classes } from "../utils/helpers";

const cl = _classes(styles);

CTA.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["dark", "light", "underline", ,]),
  size: PropTypes.string,
  className: PropTypes.string,
  external: PropTypes.bool,
};

CTA.defaultProps = {
  text: "",
  path: "",
  onClick: () => null,
  size: "medium",
  type: "dark",
  className: "",
};

export default function CTA({
  text,
  path,
  onClick,
  type,
  size,
  className,
  external,
}) {
  if (!path && !onClick) {
    return null;
  }

  return (
    <Link
      title={text}
      className={[cl(["_", type, size]), className].join(" ")}
      path={path}
      onClick={onClick}
      external={external}
    />
  );
}
