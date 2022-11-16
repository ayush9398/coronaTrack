const HTMLWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: path.join(process.cwd(), "/src/SWcache.js"),
    //   swDest: "service-worker.js",
    //   dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    //   exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    //   maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    // }),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: "/node_modules/",
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};
