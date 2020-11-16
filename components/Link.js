import Link from "next/link";

CustomLink.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  query: PropTypes.object,
  onClick: PropTypes.func,
  as: PropTypes.string,
  anchor: PropTypes.string,
  external: PropTypes.string,
};

CustomLink.defaultProps = {
  path: "",
  title: "",
  className: "",
  query: {},
  onClick: () => null,
  anchor: "",
};

export default function CustomLink({
  path,
  title,
  onClick,
  className,
  query,
  children,
  as,
  anchor,
  external,
}) {
  const href = { pathname: path, query };

  if (anchor || external) {
    return (
      <a href={anchor || external} className={className} onClick={onClick}>
        {title || children || path}
      </a>
    );
  }

  if (onClick && !path) {
    return (
      <button className={className} onClick={onClick}>
        {title || children}
      </button>
    );
  }

  return (
    <Link href={href} as={as}>
      <a className={className} onClick={onClick}>
        {title || children || path}
      </a>
    </Link>
  );
}
