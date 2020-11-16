import styles from "../assets/styles/pages/login.module.scss";
import { _classes } from "../utils/helpers";
import { motion, useAnimation } from "framer-motion";
import ScrollContainer from "../components/ScrollContainer";
import ContactForm from "../forms/ContactForm";
import Meta from "../components/Meta";

const cl = _classes(styles);

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
};

export default function Contact() {
  const controls = useAnimation();

  return (
    <main className={cl("_")}>
      <Meta
        title={"Contact Us"}
        description={"Contact us page for LandlordGrades"}
      />

      <ScrollContainer
        className={cl("container")}
        onEnter={() => controls.start("visible")}
      >
        <motion.div variants={variants} initial={"hidden"} animate={controls}>
          <h1>Contact</h1>
          <p>Questions or comments? Send us a message.</p>
          <ContactForm />
        </motion.div>
      </ScrollContainer>
    </main>
  );
}
