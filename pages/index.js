import styles from "../assets/styles/pages/home.module.scss";
import { _classes } from "../utils/helpers";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import Particles from "react-particles-js";
import FieldWrapper from "@/components/FieldWrapper";

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

const formatEntity = (entity) => {
  const id = entity._id.toHexString();
  delete entity._id;
  return { ...entity, id };
};

export const getStaticProps = async (req) => {
  const { MongoClient } = require("mongodb");

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dsb-cluster-01.ifbzc.mongodb.net`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("pages");

    const findResult = await collection.find({ path: "/" }).toArray();

    client.close();

    return {
      props: {
        page: formatEntity(findResult[0]),
      },
      revalidate: 5,
    };
  } catch (e) {
    console.error(e);
  }
};
