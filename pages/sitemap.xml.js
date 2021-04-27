import API from "../utils/API";
import globby from "globby";
import prettier from "prettier";

Sitemap.propTypes = {
  sitemap: PropTypes.any,
};
export default function Sitemap({ sitemap }) {
  return <div style={{ minHeight: "100vh" }}>{`${sitemap}`}</div>;
}

export const getStaticProps = async ({ res }) => {
  const { articles, projects } = await new API().graphql({
    query: `
      query GetData{
        articles {
          id
          title
          slug
        }
        projects {
          id
          title
          slug
        }
      }
      `,
  });

  const sitemap = await createSitemap({ articles, projects });

  // res.setHeader("Content-Type", "text/xml");
  // res.write(sitemap);
  // res.end();

  return { props: { sitemap }, revalidate: 5 };
};
async function createSitemap({ articles, projects }) {
  let sitemap = "";

  const blogPages = articles
    .map(
      ({ slug }) =>
        `<url><loc>${`https://www.mattcassara.com/blog/${slug}`}</loc></url>`
    )
    .join("");

  const projectPages = projects
    .map(
      ({ slug }) =>
        `<url><loc>${`https://www.mattcassara.com/projects/${slug}`}</loc></url>`
    )
    .join("");

  const pages = await globby([
    "pages/**/*{.js,.mdx}",
    "!pages/_*.js",
    "!pages/api",
  ]);

  const formattedPages = pages
    .filter((p) => !p.match(/\[.*\]/))
    .map((page) => {
      const path = page
        .replace("pages", "")
        .replace(".js", "")
        .replace(".mdx", "");

      let route = path;

      if (path.match("/index")) {
        route = path.replace("/index", "");
      }

      return `<url><loc>${`https://www.mattcassara.com${route}`}</loc></url>\n`;
    })
    .join("");

  sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${formattedPages}
    ${blogPages}
    ${projectPages}
  </urlset>
  `;

  return prettier.format(sitemap, { parser: "html" });
}
