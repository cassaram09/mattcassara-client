Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: "",
};

export default function Image({ src, alt, className }) {
  return (
    <div
      className={`image ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
      }}
      role="img"
      aria-label={alt || src}
    />
  );
}
