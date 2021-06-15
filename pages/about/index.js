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
  global: PropTypes.object,
};

About.defaultProps = {
  page: {},
  skills: [],
  experiences: [],
  global: {},
};

export default function About({ page, skills, experiences, global }) {
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
        path={global.linkedin_url}
        external
        className={cl("cta")}
      />
      <CTA
        text={"View Github"}
        path={global.github_url}
        external
        className={cl("cta")}
      />
      <CTA
        text={"Download Resume"}
        path={global.resume.url}
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
  const api = new API("http://localhost:3000");

  const [page, experiences, global] = await Promise.all([
    api.post("/api/pages", {
      index: "pages_by_path",
      path: "/about",
      single: true,
    }),
    api.post("/api/experiences", { index: "all_experiences" }),
    api.post("/api/global", { index: "all_global_items", single: true }),
  ]);

  return {
    props: {
      page: { ref: page.ref, ts: page.ts, ...page.data },
      experiences: experiences.map((exp) => ({ ref: exp.ref, ...exp.data })),
      global: { ref: global.ref, ts: global.ts, ...global.data },
    },
  };
};
