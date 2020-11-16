import styles from "../assets/styles/components/hero_image.module.scss";
import PropTypes from "prop-types";
import { _classes } from "../utils/helpers";
import { Parallax } from "react-parallax";
import Title from "./Title";
import CTA from "./CTA";

const cl = _classes(styles);

HeroImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.string,
  subtitle: PropTypes.string,
  parallax: PropTypes.bool,
  cta: PropTypes.object,
  children: PropTypes.node,
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
  cta,
  children,
}) {
  if (parallax) {
    return (
      <div className={cl(["_", height])}>
        <Parallax blur={0} bgImage={src} bgImageAlt={alt} strength={400}>
          <div className={cl("content")}>
            {title && <Title title={title} color="white" />}
            {subtitle && <h2 className={cl("subtitle")}>{subtitle}</h2>}
            {cta && (
              <CTA
                text={cta.text}
                link={cta.link}
                onClick={cta.onClick}
                type="orange"
              />
            )}
            {children}
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
        {title && <Title title={title} color="white" />}
        {subtitle && <h2 className={cl("subtitle")}>{subtitle}</h2>}
        {cta && (
          <CTA
            text={cta.text}
            link={cta.link}
            onClick={cta.onClick}
            type="orange"
          />
        )}
        {children}
      </div>
    </div>
  );
}
