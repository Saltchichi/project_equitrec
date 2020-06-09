const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        test: /.css$/i,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
