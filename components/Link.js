import Link from "next/link";

CustomLink.propTypes = {
  path: PropTypes.string.required,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  query: PropTypes.object,
  onClick: PropTypes.func,
  as: PropTypes.string,
};

CustomLink.defaultProps = {
  path: "",
  title: "",
  className: "",
  query: {},
  onClick: () => null,
};

export default function CustomLink({
  path,
  title,
  onClick,
  className,
  query,
  children,
  as,
}) {
  const href = { pathname: path, query };

  return (
    <Link href={href} as={as}>
      <a className={className} onClick={onClick}>
        {title || children || path}
      </a>
    </Link>
  );
}
