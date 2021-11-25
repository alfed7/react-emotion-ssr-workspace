const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

const config = (env, startArgs) => {
  const isDevelopment = startArgs.mode === "development";
  return {
    entry: "./src/server.js",
    devtool: isDevelopment ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/,
          type: "asset/resource",
        },
        {
          test: /\.js(x?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  [
                    "@babel/preset-react",
                    { runtime: "automatic", importSource: "@emotion/react" },
                  ],
                ],
                plugins: [
                  "@emotion/babel-plugin",
                  "@babel/plugin-proposal-class-properties",
                  [
                    "@babel/plugin-transform-runtime",
                    {
                      regenerator: true,
                    },
                  ],
                ],
              },
            },
          ],
          resolve: {
            fullySpecified: false,
            extensions: [".js", ".jsx"],
          },
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js"],
      modules: [path.resolve(__dirname, "../web/src"), "node_modules"],
    },
    output: {
      path: path.resolve(__dirname, "../../build"),
      filename: "serverbundle.js",
    },
    target: "node",
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [
      nodeExternals(),
      {
        config: JSON.stringify({
          apiUrl: process.env.API_URL,
        }),
      },
    ],
    plugins: [
      new CopyPlugin({
        patterns: [{ toType: "file", from: ".env.prod", to: ".env" }],
      }),
    ],
  };
};

module.exports = config;
