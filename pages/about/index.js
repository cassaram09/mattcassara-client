import styles from "../../assets/styles/pages/about.module.scss";
import Experiences from "../../components/Experiences";
import API from "../../utils/API";
import { _classes } from "../../utils/helpers";
import Reveal from "../../components/Reveal";
import Title from "../../components/Title";
import Skills from "../../components/Skills";
import CTA from "../../components/CTA";

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
  const renderTitle = () => (
    <div className={cl("title")}>
      <Title title={page.title} />
    </div>
  );

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
      <div className={cl("subtitle")}>
        <Title title={page.subtitle} tag={"h2"} />
      </div>

      <div className={cl("bio__inner")}>
        <div
          className={cl("bio__excerpt")}
          dangerouslySetInnerHTML={{ __html: page.bio }}
        ></div>
        <div className={cl("bio__avatar")}>{renderAvatar()}</div>
      </div>

      <CTA
        text={"View LinkedIn"}
        path={"https://www.google.com"}
        external
        className={cl("cta")}
      />
      <CTA
        text={"View Github"}
        path={"https://www.google.com"}
        external
        className={cl("cta")}
      />
    </Reveal>
  );

  return (
    <main className={cl("_")}>
      <div className={cl("container")}>
        {renderTitle()}
        {renderBio()}

        <Experiences experiences={experiences} />
        <Skills skills={skills} />
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
          subtitle
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
          experience_roles {
            role
          }
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
