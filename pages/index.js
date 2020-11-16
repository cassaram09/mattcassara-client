import styles from "../assets/styles/pages/home.module.scss";
import HeroImage from "../components/HeroImage";
import axios from "axios";
import { _classes } from "../utils/helpers";

const cl = _classes(styles);

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

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  try {
    const res = await axios.get(`${process.env.API_URL}/home`);
    return { props: { page: res.data } };
  } catch (e) {
    console.log(e);
    return { props: { page: null } };
  }
}
