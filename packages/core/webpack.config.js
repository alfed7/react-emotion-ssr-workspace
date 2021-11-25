const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');

const config = (env, startArgs) => {
  const isDevelopment = startArgs.mode === "development";
  return {
    entry: "./src/components/index.jsx",
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
          test: /\.(js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
    },
    devServer: {
      static: path.join(__dirname, "build"),
      compress: true,
      port: 4000,
    },
    plugins: [
      new ESLintPlugin(),
    ],
  };
};

module.exports = config;
