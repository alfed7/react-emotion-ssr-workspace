module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    // Add SVGR Loader
    // ========================================================
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));

    assetRule.exclude = /\.svg$/;

    // const assetLoader = {
    //   loader: assetRule.loader,
    //   options: assetRule.options || assetRule.query,
    // };

    // // Merge our rule with existing assetLoader rules
    // config.module.rules.unshift({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", assetLoader],
    // });

    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
    });

    config.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        plugins: ["@emotion/babel-plugin"],
        presets: [
          [
            "@babel/preset-react",
            { runtime: "automatic", importSource: "@emotion/react" },
          ],
        ],
      },
    });
    config.resolve.extensions.push(".js", ".jsx");

    return config;
  },
};
