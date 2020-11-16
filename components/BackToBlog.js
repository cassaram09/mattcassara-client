import { motion, useAnimation } from "framer-motion";
import ScrollContainer from "./ScrollContainer";
import Link from "./Link";

BackToBlog.propTypes = {};

BackToBlog.defaultProps = {};

export default function BackToBlog() {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.25 } },
  };

  const controls = useAnimation();

  return (
    <div style={{ marginTop: "80px" }}>
      <ScrollContainer onEnter={() => controls.start("visible")}>
        <motion.div variants={variants} initial={"hidden"} animate={controls}>
          <Link title="Back to Blog" path="/blog" />
        </motion.div>
      </ScrollContainer>
    </div>
  );
}
