import styles from "../assets/styles/components/gallery.module.scss";
import PropTypes from "prop-types";
import { _classes } from "../utils/helpers";
import Image from "./Image";

const cl = _classes(styles);

Gallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};

Gallery.defaultProps = {
  images: [],
  onClick: () => null,
};

export default function Gallery({ images, onClick }) {
  return (
    <ul className={cl(["_"])}>
      {images.map((image, index) => (
        <li
          className={cl("slide")}
          key={image.url}
          onClick={() => onClick(index)}
        >
          <Image src={image.url} alt={image.alternativeText} />
        </li>
      ))}
    </ul>
  );
}
