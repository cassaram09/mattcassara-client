import styles from "../assets/styles/pages/home.module.scss";
import { _classes } from "../utils/helpers";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import Particles from "react-particles-js";
import { FieldWrapper } from "@/admin";

const cl = _classes(styles);

Home.propTypes = {
  page: PropTypes.object,
};

export default function Home({ page }) {
  const [width, setWidth] = useState("");

  const resize = () => {
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
    const params = JSON.parse(page.particles_params);

    if (width === "mobile") {
      params.particles.number.value = 15;
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
            <FieldWrapper
              name="subtitle"
              className={cl("subtitle")}
              type="text"
            >
              <Title
                title={page.subtitle}
                tag={"h2"}
                delay={1000}
                animation={"fadeRight"}
              />
            </FieldWrapper>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async (req) => {
  const service = require("@/services/MongoDBService");

  try {
    await service.connect();
    const db = service.database();
    const collection = db.collection("pages");

    const page = await collection.findOne({ path: "/" });

    service.close();

    return {
      props: {
        page: service.formatEntity(page),
      },
      revalidate: 5,
    };
  } catch (e) {
    console.error(e);
  }
};
