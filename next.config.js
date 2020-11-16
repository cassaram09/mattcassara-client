const OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    if (isServer) {
      require("./scripts/sitemap");
    }

    if (dev && !isServer) {
      config = Object.assign(config, {
        devServer: {
          compress: true,
          port: 3000,
          host: "localhost",
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
          url: `http://localhost:3000/`,
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
};
