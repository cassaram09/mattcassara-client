import Head from "next/head";

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  page: PropTypes.object,
};

Meta.defaultProps = {
  title: "",
  description: "",
  page: {},
};

export default function Meta({ title, description, page }) {
  const _title =
    !title && !page.title
      ? "LandlordGrades"
      : (title || page.title) + " | LandlordGrades";

  return (
    <Head>
      <title>{_title}</title>
      <meta
        name="description"
        content={
          description ||
          page.description ||
          "LandlordGrades is NYC's only crowd-sourced and data-driven landlord review platform."
        }
      />
    </Head>
  );
}
