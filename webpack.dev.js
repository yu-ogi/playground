const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "src"),
    index: "index.html",
    inline: true,
    hot: true,
    progress: true,
    port: 8080
  }
});
