import styles from "../../assets/styles/pages/project.module.scss";
import API from "../../utils/API";
import { _classes } from "../../utils/helpers";
import Reveal from "../../components/Reveal";
import HeroImage from "../../components/HeroImage";
import Gallery from "../../components/Gallery";
import Modal from "../../components/Modal";
import { useState } from "react";
import Image from "../../components/Image";
import Slick from "react-slick";
import CTA from "../../components/CTA";

const cl = _classes(styles);

Project.propTypes = {
  page: PropTypes.object,
};

Project.defaultProps = {
  page: {},
};

export default function Project({ page }) {
  const [modalOpen, toggleModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: activeImage,
    accessibility: true,
    fade: true,
  };

  return (
    <main className={cl("")}>
      <Modal
        open={modalOpen}
        close={() => {
          toggleModal(false);
          setActiveImage(null);
        }}
      >
        <Slick {...settings}>
          {page.gallery.map((image, index) => (
            <li
              className={cl("slide")}
              key={image.url}
              onClick={() => onClick(index)}
            >
              <Image src={image.url} alt={image.alternativeText} />
            </li>
          ))}
        </Slick>
        {/* {activeImage !== null && <Image src={page.gallery[activeImage].url} />} */}
      </Modal>

      <HeroImage
        src={page.featured_image.url}
        title={page.title}
        height={"tall"}
      />
      <div className={cl("container")}>
        <Reveal className={cl("content")} preset={"fade"} delay={500}>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />

          <CTA
            text={"View Project"}
            path={page.link}
            external
            className={cl("cta")}
          />
        </Reveal>

        <Reveal preset={"fadeUp"} delay={500}>
          <Gallery
            images={page.gallery}
            onClick={(index) => {
              setActiveImage(index);
              toggleModal(true);
            }}
          />
        </Reveal>
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx) => {
  const { projectBySlug } = await new API().graphql({
    query: `
      query GetProject {
        projectBySlug(slug: "${ctx.params.projectSlug}") {
          id
          title
          content
          featured_image {
            url
            alternativeText
          }
          gallery {
            name
            url
          }
        }
      }
      `,
  });

  return {
    props: {
      page: projectBySlug,
    },
  };
};
