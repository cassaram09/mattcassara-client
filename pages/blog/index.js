import styles from "../../assets/styles/pages/blog.module.scss";
import API from "../../utils/api";
import { _class } from "../../utils/helpers";
import Link from "../../components/Link";
import moment from "moment";
import Title from "../../components/Title";
import Reveal from "../../components/Reveal";

const cl = _class(styles, "blog");

Blog.propTypes = {
  page: PropTypes.object,
  articles: PropTypes.array,
  categories: PropTypes.array,
};

Blog.defaultProps = {
  page: {},
  articles: [],
  categories: [],
};

export default function Blog({ page, articles, categories }) {
  const renderArticles = () => {
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
      <section className={cl("articles")}>
        <Reveal element="ul" className={cl("article__list")} variants={list}>
          {articles.map((article) => {
            const src =
              "https://www.mattcassara.com/wp-content/uploads/2018/05/app-applications-apps-147413-1024x683.jpg";
            const alt = "alt";

            const item = {
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            };

            return (
              <Reveal
                className={`${cl("article__list__item")} ${styles.draw}`}
                key={article.id}
                element="li"
                variants={item}
                delay={500}
              >
                <Link path={`/blog/[slug]`} as={`/blog/${article.slug}`}>
                  <p>{moment(article.published_at).format("LL")}</p>
                  <div className={cl("article__list__item__logo")}>
                    <div
                      style={{ backgroundImage: `url('${src}')` }}
                      role="img"
                      aria-label={alt}
                    />
                  </div>
                  <div className={cl("article__list__item__content")}>
                    <h2>{article.title}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: article.content.split("</p>")[0] + "</p>",
                      }}
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </Reveal>
      </section>
    );
  };

  const renderSidebar = () => {
    return (
      <section className={cl("sidebar")}>
        <Reveal preset={"fadeRight"} delay={500}>
          <h3>Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>{cat.title}</li>
            ))}
          </ul>
        </Reveal>
      </section>
    );
  };

  return (
    <main className={cl("")}>
      <div className={cl("container")}>
        <Title title={page.title} />
        <div className={cl("inner")}>
          {renderArticles()}
          {renderSidebar()}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const { blog, articles, categories } = await new API().graphql({
    query: `
      query GetBlog{
        blog {
          id
          title
          hero_image {
            url
          }
        }
        articles {
          id
          title
          content
          publish_date
          slug
          image {
            url
          }
        }
        categories {
          id
          title
        }
      }
      `,
  });

  return {
    props: {
      page: blog,
      articles,
      categories,
    },
  };
};
