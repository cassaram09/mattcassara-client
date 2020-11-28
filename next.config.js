const os = require("os");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    if (dev && !isServer) {
      const OpenBrowserPlugin = require("open-browser-webpack-plugin");

      const ifaces = os.networkInterfaces();
      let ip = "localhost";

      Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
          if (iface.family === "IPv4" && !iface.internal) {
            ip = iface.address;
          } else {
            return;
          }
        });
      });

      config = Object.assign(config, {
        devServer: {
          compress: true,
          port: 3000,
          host: ip,
          hot: true,
          inline: true,
          historyApiFallback: true,
          stats: { colors: true },
          watchOptions: {
            poll: true,
            aggregateTimeout: 1000,
          },
        },
      });

      config.plugins.push(
        new OpenBrowserPlugin({
          url: `http://${ip}:3000/`,
        })
      );
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom",
        PropTypes: "prop-types",
      })
    );

    config.module.rules.push({
      test: /\.(png|gif|jpg|jpeg|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            emitFile: isServer,
            publicPath: `/_next/static/`,
            outputPath: `${isServer ? "../" : ""}static/`,
            name: "[path][name].[ext]",
          },
        },
      ],
    });

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  redirects: () => [
    {
      source: "/blog",
      destination: "/",
      permanent: true,
    },
  ],
};
