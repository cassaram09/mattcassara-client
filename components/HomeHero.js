import styles from "../assets/styles/components/home_hero.module.scss";
import PropTypes from "prop-types";
import { _classes } from "../utils/helpers";
// import { Parallax } from "react-parallax";
// import img from "../assets/images/vector_building.svg";
import { building } from "./SVG";

const cl = _classes(styles);

HomeHero.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
};

HomeHero.defaultProps = {
  src: "",
  height: "medium",
};

export default function HomeHero({ src, alt, children }) {
  return (
    <div className={cl(["_"])}>
      <div className={cl("building")}>{building}</div>

      <div className={cl("content")}>{children}</div>
      {/* <Parallax blur={0} bgImage={src} bgImageAlt={alt} strength={400}>
        

        <div className={cl(["parallax"])} />
      </Parallax>
      <a href="https://www.vecteezy.com/free-vector/building">
        Building Vectors by Vecteezy
      </a> */}
    </div>
  );
}
