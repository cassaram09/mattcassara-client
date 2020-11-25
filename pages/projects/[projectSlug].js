import styles from "../../assets/styles/pages/project.module.scss";
import API from "../../utils/api";
import { _classes } from "../../utils/helpers";
import Title from "../../components/Title";
import Reveal from "../../components/Reveal";
import Image from "../../components/Image";

const cl = _classes(styles);

Project.propTypes = {
  page: PropTypes.object,
};

Project.defaultProps = {
  page: {},
};

export default function Project({ page }) {
  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={page.title} />
        </div>

        <Reveal className={cl("hero_image")} preset={"fadeUp"}>
          <Image
            src={page.featured_image.url}
            alt={page.featured_image.alternativeText}
          />
        </Reveal>

        <Reveal className={cl("content")} preset={"fade"} delay={1000}>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Reveal>
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
            alternativeText
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
