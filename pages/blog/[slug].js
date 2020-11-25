import styles from "../../assets/styles/pages/article.module.scss";
import API from "../../utils/api";
import { _classes } from "../../utils/helpers";
import moment from "moment";
import Title from "../../components/Title";
import Reveal from "../../components/Reveal";
import Categories from "../../components/Categories";
import BackToBlog from "../../components/BackToBlog";
import Image from "../../components/Image";

const cl = _classes(styles);

Article.propTypes = {
  page: PropTypes.object,
};

Article.defaultProps = {
  page: {},
};

export default function Article({ page }) {
  return (
    <main className={cl("_")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={page.title} />
          <Reveal preset={"fadeUp"} delay={500}>
            <p className={cl("date")}>
              {moment(page.publish_date).format("LL")}
            </p>
          </Reveal>
        </div>

        <Reveal className={cl("hero_image")} preset={"fadeUp"}>
          <Image src={page.image.url} alt={page.image.alternativeText} />
        </Reveal>

        <Reveal className={cl("content")} preset={"fade"} delay={1000}>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Reveal>

        <Reveal className={cl("content")} preset={"fadeUp"}>
          <Categories categories={page.categories} />
          <BackToBlog />
        </Reveal>
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx) => {
  const { articleBySlug } = await new API().graphql({
    query: `
      query GetArticle {
        articleBySlug(slug: "${ctx.params.slug}") {
          id
          title
          content
          categories {
            title
          }
          publish_date
          image {
            url
            alternativeText
          }
        }
      }
      `,
  });

  return {
    props: {
      page: articleBySlug,
    },
  };
};
