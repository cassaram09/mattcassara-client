import styles from "../assets/styles/pages/home.module.scss";
import { _classes } from "../utils/helpers";
import HeroImage from "../components/HeroImage";
import API from "../utils/API";

const cl = _classes(styles);

Home.propTypes = {
  page: PropTypes.object,
};

export default function Home({ page }) {
  return (
    <main className={cl("_")}>
      <HeroImage
        src={page.hero_image.url}
        title={page.title}
        height="tall"
        subtitle={page.subtitle}
      />
    </main>
  );
}

export const getServerSideProps = async () => {
  const data = await new API().graphql({
    query: `
      query GetHome{
        home {
          title
          subtitle
          hero_image {
            url
          }
        }
      }
      `,
  });

  return {
    props: {
      page: data.home,
    },
  };
};
