import styles from "../../assets/styles/pages/about.module.scss";
import HeroImage from "../../components/HeroImage";
import API from "../../utils/api";
import { _classes } from "../../utils/helpers";
import * as SVG from "../../components/SVG";
import Reveal from "../../components/Reveal";

const cl = _classes(styles);

About.propTypes = {
  page: PropTypes.object,
  skills: PropTypes.array,
  experiences: PropTypes.array,
};

About.defaultProps = {
  page: {},
  skills: [],
  experiences: [],
};

export default function About({ page, skills, experiences }) {
  const renderAvatar = () => {
    const src = page.avatar.url;
    const alt = page.avatar.alt || src;

    return (
      <div className={cl("avatar")}>
        <div
          style={{ backgroundImage: `url('${src}')` }}
          role="img"
          aria-label={alt}
        />
      </div>
    );
  };

  const renderBio = () => (
    <Reveal preset={"fade"} delay={500} className={cl("bio")}>
      <div className={cl("bio__avatar")}>{renderAvatar()}</div>
      <div className={cl("bio__excerpt")}>
        <div dangerouslySetInnerHTML={{ __html: page.bio }} />
      </div>
    </Reveal>
  );

  const renderExperience = () => {
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

    return (
      <div className={cl("experience")}>
        <h2>Experience</h2>

        <Reveal
          variants={list}
          className={cl("experience__list")}
          element={"ul"}
        >
          {experiences.map((experience) => {
            const src = experience.logo && experience.logo.url;
            const alt = (experience.logo && experience.logo.alt) || src;

            return (
              <Reveal
                element={"li"}
                preset={"fadeUp"}
                key={experience.id}
                className={cl("experience__list__item")}
              >
                <div className={cl("experience__list__item__left")}>
                  <Reveal
                    preset={"fadeLeft"}
                    className={cl("experience__list__item__logo")}
                    delay={500}
                  >
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      role="img"
                      aria-label={alt}
                    />
                  </Reveal>
                </div>
                <div className={cl("experience__list__item__right")}>
                  <h3>{experience.title}</h3>
                  <h4>{experience.role}</h4>

                  <div
                    dangerouslySetInnerHTML={{ __html: experience.content }}
                  />
                </div>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    );
  };

  const renderSkills = () => {
    const list = {
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.2,
          delay: 0.25,
        },
      },
      hidden: {
        opacity: 0,
        transition: {
          when: "afterChildren",
        },
      },
    };

    return (
      <div className={cl("skills")}>
        <h2>Skills</h2>
        <Reveal className={cl("skills__list")} element={"ul"} variants={list}>
          {skills.map((skill) => {
            const item = {
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <Reveal
                element={"li"}
                className={cl("skills__list__item")}
                key={skill.id}
                variants={item}
              >
                <div className={cl("skills__list__item__icon")}>
                  {SVG[skill.icon]}
                </div>
                <p className={cl("skills__list__item__title")}>{skill.title}</p>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    );
  };

  return (
    <main className={cl("_")}>
      <HeroImage
        src={page.hero_image.url}
        title={page.title}
        height="short"
        parallax
      />
      <div className={cl("container")}>
        {renderBio()}

        {renderExperience()}

        {renderSkills()}
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const { about, experiences, skills } = await new API().graphql({
    query: `
      query GetAbout{
        about {
          title
          bio
          hero_image {
            url
          }
          avatar {
            url
          }
        }
        experiences {
          id
          title
          slug
          role
          location
          start_date
          end_date
          content
          logo {
            url
          }
        }
        skills {
          id
          title
          icon
        }
      }
      `,
  });

  return {
    props: {
      page: about,
      experiences,
      skills,
    },
  };
};
