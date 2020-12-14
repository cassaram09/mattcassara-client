import styles from "../assets/styles/pages/404.module.scss";
import { _classes } from "../utils/helpers";

import Title from "../components/Title";

const cl = _classes(styles);

function Error({ statusCode }) {
  return (
    <main className={cl("_")}>
      <div className={cl("container")}>
        <div className={cl("title")}>
          <Title title={"500"} />
          <p>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : "An error occurred on client"}
          </p>
        </div>
      </div>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
