import pkg from "../package.json";

export default function GoogleAnalytics() {
  const id = pkg.config.GA_ID;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      ></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          const hostname = document.location.hostname;
          if (!hostname.match("localhost") && !hostname.match("vercel")) {
            console.log("Loading GA...")
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
        
            gtag("config", "${id}");
          }
          `,
        }}
      />
    </>
  );
}
