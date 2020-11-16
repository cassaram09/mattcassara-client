import styles from "../../assets/styles/pages/project.module.scss";
import axios from "axios";
import { _class } from "../../utils/helpers";
import Title from "../../components/Title";
import { motion } from "framer-motion";
const cl = _class(styles, "project");

Project.propTypes = {
  project: PropTypes.object,
};

Project.defaultProps = {
  project: {},
};

export default function Project({ project }) {
  const renderImage = () => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
    };

    return (
      <motion.div
        className={cl("hero_image")}
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
      >
        <div
          style={{
            backgroundImage: `url(${project.featured_image.url})`,
          }}
          role="img"
          aria-label={"alt"}
        />
      </motion.div>
    );
  };

  const renderContent = () => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { delay: 1 } },
    };
    return (
      <motion.div
        className={cl("content")}
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
      >
        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </motion.div>
    );
  };

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={project.title} />
        </div>

        {renderImage()}

        {renderContent()}
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`${process.env.API_URL}/projects`);
  return {
    paths: res.data.map((project) => ({
      params: { projectSlug: project.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/projects/${ctx.params.projectSlug}`
    );

    return {
      props: { project: res.data },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
