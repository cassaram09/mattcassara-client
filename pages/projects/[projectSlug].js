import styles from "../../assets/styles/pages/project.module.scss";
import API from "../../utils/api";
import { _class } from "../../utils/helpers";
import Title from "../../components/Title";
import Reveal from "../../components/Reveal";

const cl = _class(styles, "project");

Project.propTypes = {
  page: PropTypes.object,
};

Project.defaultProps = {
  page: {},
};

export default function Project({ page }) {
  const renderImage = () => (
    <Reveal className={cl("hero_image")} preset={"fadeDown"}>
      <div
        style={{
          backgroundImage: `url(${page.featured_image.url})`,
        }}
        role="img"
        aria-label={"alt"}
      />
    </Reveal>
  );

  const renderContent = () => (
    <Reveal className={cl("content")} preset={"fadeUp"}>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Reveal>
  );

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={page.title} />
        </div>

        {renderImage()}

        {renderContent()}
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx) => {
  const { projectBySlug } = await new API().graphql({
    query: `
      query GetProject {
        projectBySlug(slug: "${ctx.params.projectSlug}") {
          id
          title
          content
          featured_image {
            url
          }
        }
      }
      `,
  });

  return {
    props: {
      page: projectBySlug,
    },
  };
};
