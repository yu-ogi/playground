const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    config.resolve = {
      extensions: [".ts", ".js", ".vue"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "~": path.join(__dirname, "..", "src")
      }
    };
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          },
        }
      ],
    });
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["javascript", "typescript", "json"]
      })
    );
    return config;
  }
}
