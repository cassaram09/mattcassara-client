import Link from "./Link";
import styles from "../assets/styles/components/cta.module.scss";

CTA.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    "dark",
    "light",
    "transparent",
    "underline",
    "blue",
    "green",
  ]),
  size: PropTypes.string,
  className: PropTypes.string,
  query: PropTypes.object,
};

CTA.defaultProps = {
  text: "",
  link: "",
  onClick: () => null,
  size: "medium",
  type: "dark",
  className: "",
};

export default function CTA({
  text,
  link,
  onClick,
  type,
  size,
  className,
  query,
}) {
  if (!link && !onClick) {
    return null;
  }

  const _classes = `${styles._} ${styles[type] || ""} ${
    styles[size] || ""
  } ${className}`;

  return (
    <Link
      title={text}
      className={_classes}
      path={link}
      onClick={onClick}
      query={query}
    />
  );
}
