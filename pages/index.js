import styles from "../assets/styles/pages/home.module.scss";
import { _classes } from "../utils/helpers";
import Title from "../components/Title";
import API from "../utils/API";
import Reveal from "../components/Reveal";
import Particles from "react-particles-js";

const cl = _classes(styles);

Home.propTypes = {
  page: PropTypes.object,
};

export default function Home({ page }) {
  return (
    <main className={cl("_")}>
      <div className={cl("background")}>
        <Particles height="100%" params={page.particles_params} />
        <div className={cl("container")}>
          <div className={cl("content")}>
            <div className={cl("title")}>
              <Title title={page.title} animation={"fadeDown"} />
            </div>
            <div className={cl("subtitle")}>
              <Title title={page.subtitle} tag="h2" delay={1000} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const data = await new API().graphql({
    query: `
      query GetHome{
        home {
          title
          subtitle
          particles_params
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
