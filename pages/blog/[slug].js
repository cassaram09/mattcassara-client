import styles from "../../assets/styles/pages/article.module.scss";
import axios from "axios";
import { _class } from "../../utils/helpers";
import moment from "moment";
import Title from "../../components/Title";
import { motion } from "framer-motion";
import Categories from "../../components/Categories";
import BackToBlog from "../../components/BackToBlog";

const cl = _class(styles, "article");

Article.propTypes = {
  article: PropTypes.object,
};

Article.defaultProps = {
  article: {},
};

export default function Article({ article }) {
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
            backgroundImage: `url(https://www.mattcassara.com/wp-content/uploads/2018/05/app-applications-apps-147413.jpg)`,
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
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </motion.div>
    );
  };

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <div className={cl("heading")}>
          <Title title={article.title} />
          <p className={cl("date")}>
            {moment(article.published_at).format("LL")}
          </p>
        </div>

        {renderImage()}

        {renderContent()}

        <div className={cl("content")}>
          <Categories categories={article.categories} />
          <BackToBlog />
        </div>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`${process.env.API_URL}/articles/`);
  return {
    paths: res.data.map((article) => ({
      params: { slug: article.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/articles/${ctx.params.slug}`
    );

    return {
      props: { article: res.data },
    };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
