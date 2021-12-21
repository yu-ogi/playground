const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
      watch: true
    },
    client: {
      logging: "verbose",
      overlay: true,
      progress: true
    },
    watchFiles: [
      path.resolve(__dirname, "src")
    ],
    compress: true,
    liveReload: true,
    hot: false,
    port: 8090
  }
});
