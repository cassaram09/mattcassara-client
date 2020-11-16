import styles from "../../assets/styles/pages/about.module.scss";
import HeroImage from "../../components/HeroImage";
import axios from "axios";
import { _classes } from "../../utils/helpers";
import * as SVG from "../../components/SVG";
import { motion, useAnimation } from "framer-motion";
import ScrollContainer from "../../components/ScrollContainer";
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

  const renderBio = () => {
    // const bio = {
    //   visible: {
    //     opacity: 1,
    //     transition: {
    //       duration: 0.5,
    //       delay: 0.5,
    //     },
    //   },
    //   hidden: {
    //     opacity: 0,
    //   },
    // };

    return (
      <Reveal preset={"fade"} delay={500} className={cl("bio")}>
        <div className={cl("bio__avatar")}>{renderAvatar()}</div>
        <div className={cl("bio__excerpt")}>
          <div dangerouslySetInnerHTML={{ __html: page.bio }} />
        </div>
      </Reveal>
    );
    // return (
    //   <motion.section
    //     className={cl("bio")}
    //     variants={bio}
    //     initial={"hidden"}
    //     animate={"visible"}
    //   >

    //   </motion.section>
    // );
  };

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

    const controls = useAnimation();

    return (
      <ScrollContainer
        className={cl("experience")}
        onEnter={() => controls.start("visible")}
      >
        <h2>Experience</h2>

        <motion.ul
          variants={list}
          initial={"hidden"}
          animate={controls}
          className={cl("experience__list")}
        >
          {experiences.map((experience) => {
            const src = experience.logo.url;
            const alt = experience.logo.alt || src;

            const item = {
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            };

            const logo = {
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            };

            return (
              <motion.li
                variants={item}
                key={experience.id}
                className={cl("experience__list__item")}
              >
                <div className={cl("experience__list__item__left")}>
                  <motion.div
                    variants={logo}
                    className={cl("experience__list__item__logo")}
                  >
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      role="img"
                      aria-label={alt}
                    />
                  </motion.div>
                </div>
                <div className={cl("experience__list__item__right")}>
                  <h3>{experience.title}</h3>
                  <h4>{experience.role}</h4>

                  <div
                    dangerouslySetInnerHTML={{ __html: experience.content }}
                  />
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </ScrollContainer>
    );
  };

  const renderSkills = () => {
    const controls = useAnimation();

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
      <ScrollContainer
        className={cl("skills")}
        onEnter={() => controls.start("visible")}
      >
        <h2>Skills</h2>
        <motion.ul
          className={cl("skills__list")}
          variants={list}
          initial={"hidden"}
          animate={controls}
        >
          {skills.map((skill) => {
            const item = {
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <motion.li
                className={cl("skills__list__item")}
                key={skill.id}
                variants={item}
              >
                <div className={cl("skills__list__item__icon")}>
                  {SVG[skill.icon]}
                </div>
                <p className={cl("skills__list__item__title")}>{skill.title}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </ScrollContainer>
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

export async function getStaticProps() {
  try {
    const res = await axios.get(`${process.env.API_URL}/about`);
    const { page, skills, experiences } = res.data;

    return {
      props: { page, skills, experiences },
    };
  } catch (e) {
    console.log(e);
    return { props: { page: null } };
  }
}
