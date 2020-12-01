import styles from "../../assets/styles/pages/projects.module.scss";
import API from "../../utils/API";
import { _classes } from "../../utils/helpers";
import { motion } from "framer-motion";
import Link from "../../components/Link";
import Title from "../../components/Title";
import Reveal from "../../components/Reveal";
import moment from "moment";
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
      <motion.ul
        variants={list}
        initial={"hidden"}
        animate={"visible"}
        className={cl("list")}
      >
        {projects
          .sort(
            (a, b) =>
              moment(b.completed_on).toDate() - moment(a.completed_on).toDate()
          )
          .map((project) => {
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
                    <h3>
                      {project.company.replace(/_/g, " ")} -{" "}
                      <span className={cl("date")}>
                        {moment(project.completed_on).format("YYYY")}
                      </span>
                    </h3>

                    <p>{project.excerpt}</p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
      </motion.ul>
    );
  };

  const renderIntro = () => (
    <div className={cl("intro")}>
      <Title title={page.title} />
      <Reveal>
        <div
          dangerouslySetInnerHTML={{ __html: page.description }}
          preset={"fadeUp"}
        />
      </Reveal>
    </div>
  );

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        {renderIntro()}
        {renderProjects()}
      </div>
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
          description
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
          completed_on
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
