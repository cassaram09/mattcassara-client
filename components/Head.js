import NextHead from "next/head";

Head.propTypes = {
  page: PropTypes.object,
};

Head.defaultProps = {};

export default function Head({ page }) {
  return (
    <NextHead>
      <title>{page.title || "Matt Cassara"}</title>

      <meta name="viewport" content="initial-scale=1.0" />

      <meta name="description" content={"Not your average web developer."} />

      <meta property="og:image" content={""} />
      <meta charSet="utf-8" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      <link rel="canonical" href={"https://www.mattcassara.com"} />

      <link rel="icon" type="image/png" href={"/favicon.ico"} />
    </NextHead>
  );
}
