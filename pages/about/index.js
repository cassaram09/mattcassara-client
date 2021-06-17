import styles from "../../assets/styles/pages/about.module.scss";
import Experiences from "../../components/Experiences";
import API from "../../utils/API";
import { _classes } from "../../utils/helpers";
import Reveal from "../../components/Reveal";
import Title from "../../components/Title";
import Skills from "../../components/Skills";
import CTA from "../../components/CTA";
import { useAppState } from "@/providers";
import FieldWrapper from "@/components/FieldWrapper";
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

export default function About({ skills, experiences, global }) {
  const { page } = useAppState();

  const renderTitle = () => (
    <FieldWrapper name="title" className={cl("title")} type="textarea">
      <Title title={page.title} />
    </FieldWrapper>
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
      <FieldWrapper name="subtitle" className={cl("subtitle")} type="textarea">
        <Title title={page.subtitle} tag={"h2"} />
      </FieldWrapper>

      <div className={cl("bio__inner")}>
        <FieldWrapper name="bio" className={cl("bio__excerpt")}>
          <div dangerouslySetInnerHTML={{ __html: page.bio }}></div>
        </FieldWrapper>

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
      page: { ref: page.ref["@ref"].id, ts: page.ts, ...page.data },
      experiences: experiences.map((exp) => ({ ref: exp.ref, ...exp.data })),
      global: { ref: global.ref, ts: global.ts, ...global.data },
    },
  };
};
