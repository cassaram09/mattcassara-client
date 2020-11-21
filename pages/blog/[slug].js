import styles from "../../assets/styles/pages/article.module.scss";
import API from "../../utils/api";
import { _class } from "../../utils/helpers";
import moment from "moment";
import Title from "../../components/Title";
import { motion } from "framer-motion";
import Categories from "../../components/Categories";
import BackToBlog from "../../components/BackToBlog";

const cl = _class(styles, "article");

Article.propTypes = {
  page: PropTypes.object,
};

Article.defaultProps = {
  page: {},
};

export default function Article({ page }) {
  const renderImage = () => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
    };

    return (
      <motion.div
        className={cl("hero_image")}
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
      >
        <div
          style={{
            backgroundImage: page.image.url,
          }}
          role="img"
          aria-label={"alt"}
        />
      </motion.div>
    );
  };

  const renderContent = () => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { delay: 1 } },
    };
    return (
      <motion.div
        className={cl("content")}
        variants={variants}
        initial={"hidden"}
        animate={"visible"}
      >
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </motion.div>
    );
  };

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={page.title} />
          <p className={cl("date")}>{moment(page.publish_date).format("LL")}</p>
        </div>

        {renderImage()}

        {renderContent()}

        <div className={cl("content")}>
          <Categories categories={page.categories} />
          <BackToBlog />
        </div>
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
