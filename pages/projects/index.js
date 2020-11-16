import styles from "../../assets/styles/pages/projects.module.scss";
import axios from "axios";
import { _class } from "../../utils/helpers";
import { motion } from "framer-motion";
import Link from "../../components/Link";
import Title from "../../components/Title";
const cl = _class(styles, "projects");

Projects.propTypes = {
  page: PropTypes.object,
  projects: PropTypes.array,
};

Projects.defaultProps = {
  page: {},
  projects: [],
};

export default function Projects({ page, projects }) {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4,
        delay: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  const renderProjects = () => {
    return (
      <section className={cl("project")}>
        <Title title={page.title} />
        <motion.ul
          variants={list}
          initial={"hidden"}
          animate={"visible"}
          className={cl("project__list")}
        >
          {projects.map((project) => {
            const src = project.logo.url;
            const alt = project.logo.alt || src;
            const item = {
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <motion.li
                className={cl("project__list__item")}
                key={project.id}
                variants={item}
              >
                <Link
                  path={"/projects/[projectSlug]"}
                  as={`/projects/${project.slug}`}
                >
                  <p>{project.company.replace(/_/g, " ")}</p>
                  <div className={cl("project__list__item__logo")}>
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      role="img"
                      aria-label={alt}
                    />
                  </div>
                  <div className={cl("project__list__item__content")}>
                    <h2>{project.title}</h2>
                    <p>{project.excerpt}</p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </section>
    );
  };

  return (
    <main className={cl("")}>
      <div className={cl("container")}>{renderProjects()}</div>
    </main>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get(`${process.env.API_URL}/projects-page`);
    const { page, projects } = res.data;

    return {
      props: { page, projects },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
