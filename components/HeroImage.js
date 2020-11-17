import styles from "../assets/styles/components/hero_image.module.scss";
import PropTypes from "prop-types";
import { _classes } from "../utils/helpers";
import { Parallax } from "react-parallax";
import Title from "./Title";
const cl = _classes(styles);

HeroImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.string,
  subtitle: PropTypes.string,
  parallax: PropTypes.bool,
};

HeroImage.defaultProps = {
  src: "",
  height: "medium",
};

export default function HeroImage({
  src,
  alt,
  title,
  height,
  subtitle,
  parallax,
}) {
  if (parallax) {
    return (
      <div className={cl(["_", height])}>
        <Parallax blur={0} bgImage={src} bgImageAlt={alt} strength={400}>
          <div className={cl("content")}>
            {title && <Title title={title} />}
            {subtitle && <h2 className={cl("subtitle")}>{subtitle}</h2>}
          </div>

          <div className={cl(["parallax", height])} />
        </Parallax>
      </div>
    );
  }
  return (
    <div className={cl(["_", height])}>
      <div
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={alt || src}
        className={cl("background")}
      />
      <div className={cl("content")}>
        {title && <Title title={title} />}
        {subtitle && <h2 className={cl("subtitle")}>{subtitle}</h2>}
      </div>
    </div>
  );
}
