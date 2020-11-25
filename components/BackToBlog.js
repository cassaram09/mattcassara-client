import Reveal from "./Reveal";
import Link from "./Link";

BackToBlog.propTypes = {};

BackToBlog.defaultProps = {};

export default function BackToBlog() {
  return (
    <div style={{ marginTop: "80px" }}>
      <Reveal preset={"fade"}>
        <Link title="Back to Blog" path="/blog" />
      </Reveal>
    </div>
  );
}
