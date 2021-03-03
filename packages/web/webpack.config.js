const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const targetFolder = "../../build/public";
const config = (env, startArgs) => {
  const isDevelopment = startArgs.mode === "development";
  return {
    entry: "./src/index.jsx",
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
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    output: {
      path: path.resolve(__dirname, targetFolder),
      filename: "bundle.js",
    },
    devServer: {
      contentBase: path.join(__dirname, targetFolder),
      compress: true,
      port: 4000,
    },
    plugins: [new HtmlWebpackPlugin({ template: "src/assets/index.html" })],
  };
};

module.exports = config;
