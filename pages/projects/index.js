import styles from "../../assets/styles/pages/projects.module.scss";
import API from "../../utils/api";
import { _classes } from "../../utils/helpers";
import { motion } from "framer-motion";
import Link from "../../components/Link";
import Title from "../../components/Title";

const cl = _classes(styles);

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
          className={cl("list")}
        >
          {projects.map((project) => {
            const src = project.logo && project.logo.url;
            const alt = (project.logo && project.logo.alt) || src;
            const item = {
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <motion.li
                className={cl("list__item")}
                key={project.id}
                variants={item}
              >
                <Link
                  path={"/projects/[projectSlug]"}
                  as={`/projects/${project.slug}`}
                >
                  <div className={cl("list__item__logo")}>
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      role="img"
                      aria-label={alt}
                    />
                  </div>
                  <div className={cl("list__item__content")}>
                    <h2>{project.title}</h2>
                    <p>{project.excerpt}</p>
                  </div>
                  {/* <p>{project.company.replace(/_/g, " ")}</p> */}
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

export const getStaticProps = async () => {
  const { projectpage, projects } = await new API().graphql({
    query: `
      query GetProjectsPage {
        projectpage {
          id
          title
          hero_image {
            url
          }
        }
        projects {
          id
          title
          content
          excerpt
          logo {
            url
          }
          company
          slug
        }
      }
      `,
  });

  return {
    props: {
      page: projectpage,
      projects,
    },
  };
};
