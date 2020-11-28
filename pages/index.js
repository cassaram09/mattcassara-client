import styles from "../assets/styles/pages/home.module.scss";
import { _classes } from "../utils/helpers";
import Title from "../components/Title";
import API from "../utils/API";
import { useEffect, useState } from "react";
import Particles from "react-particles-js";

const cl = _classes(styles);

Home.propTypes = {
  page: PropTypes.object,
};

export default function Home({ page }) {
  const [width, setWidth] = useState("");

  const resize = () => {
    console.log("RESIZE", window.innerWidth);
    if (window.innerWidth < 768) {
      return setWidth("mobile");
    }

    setWidth("desktop");
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return function cleanup() {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const setParticleParams = () => {
    const params = page.particles_params;

    console.log("PARAMS", width, params.particles.number);
    if (width === "mobile") {
      params.particles.number.value = 15;
      console.log(params);
    }

    return params;
  };

  return (
    <main className={cl("_")}>
      <div className={cl("background")}>
        {width && <Particles height="100%" params={setParticleParams()} />}
        <div className={cl("container")}>
          <div className={cl("content")}>
            <div className={cl("title")}>
              <Title title={page.title} animation={"fadeLeft"} />
            </div>
            <div className={cl("subtitle")}>
              <Title
                title={page.subtitle}
                tag="h2"
                delay={1000}
                animation={"fadeRight"}
              />
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
