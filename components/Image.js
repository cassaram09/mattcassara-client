Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: "",
  type: "element",
};

export default function Image({ src, alt, type, className }) {
  if (type === "background") {
    return (
      <div
        className={`image image_${type} ${className}`}
        style={{
          backgroundImage: `url('${src}')`,
        }}
        role="img"
        aria-label={alt || src}
      />
    );
  }

  return (
    <img
      alt={alt || src}
      className={`image image_${type} ${className}`}
      src={src}
    />
  );
}
