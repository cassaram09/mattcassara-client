import Title from "./Title";
import Reveal from "./Reveal";
import moment from "moment";
import styles from "../assets/styles/components/experiences.module.scss";
import { _classes } from "../utils/helpers";

const cl = _classes(styles);

Experiences.propTypes = {
  experiences: PropTypes.array,
};

Experiences.defaultProps = {
  experiences: [],
};

export default function Experiences({ experiences }) {
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

  const sortedExperiences = experiences.sort((a, b) => {
    return moment(b.start_date).toDate() - moment(a.start_date).toDate();
  });

  return (
    <div className={cl("_")}>
      <Title title={"Experience"} tag={"h2"} />
      <Reveal variants={list} className={cl("list")} element={"ul"}>
        {sortedExperiences.map((experience) => {
          const roles = experience.experience_roles.map((item) => item.role);

          const src = experience.logo && experience.logo.url;
          const alt = (experience.logo && experience.logo.alt) || src;

          return (
            <Reveal
              element={"li"}
              preset={"fadeUp"}
              key={experience.id}
              className={cl("list__item")}
            >
              <div className={cl("list__item__left")}>
                <Reveal
                  preset={"fadeLeft"}
                  className={cl("list__item__logo")}
                  delay={500}
                >
                  <div
                    style={{ backgroundImage: `url('${src}')` }}
                    role="img"
                    aria-label={alt}
                  />
                </Reveal>
              </div>
              <div className={cl("list__item__right")}>
                <div>
                  {roles.map((r) => (
                    <h3 key={r}>{r}</h3>
                  ))}
                </div>

                <h4 className={cl("company_title")}>{experience.title}</h4>
                <p className={cl("dates")}>
                  {moment(experience.start_date).format("MMMM YYYY")} -
                  {experience.end_date
                    ? " " + moment(experience.end_date).format("MMMM YYYY")
                    : " Present"}
                </p>

                <div dangerouslySetInnerHTML={{ __html: experience.content }} />
              </div>
            </Reveal>
          );
        })}
      </Reveal>
    </div>
  );
}
