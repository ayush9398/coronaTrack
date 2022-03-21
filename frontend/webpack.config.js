const HTMLWebpackPlugin = require("html-webpack-plugin");
const path =require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx"]
    },
    module:{
        rules:[
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
        ]
    }
};