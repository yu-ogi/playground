const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    bundle: "./src/main.ts",
    // "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    // "json.worker": "monaco-editor/esm/vs/language/json/json.worker",
    // "css.worker": "monaco-editor/esm/vs/language/css/css.worker",
    // "html.worker": "monaco-editor/esm/vs/language/html/html.worker",
    // "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker",
  },
  output: {
    globalObject: "self",
    filename: "[name].js",
    path: path.join(__dirname, "public", "js"),
    publicPath: "js/"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          query: {
            appendTsSuffixTo: [/\.vue$/],
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|ico)$/,
        use: {
          loader: "file-loader?name=assets/[name].[hash].[ext]"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  ie: "11"
                },
                useBuiltIns: "usage",
                corejs: 3
              }
            ]
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "~": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["javascript", "typescript", "json"]
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: path.resolve(__dirname, "html", "index.template.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
      hash: true
    })
  ]
};
