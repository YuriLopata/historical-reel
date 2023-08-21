const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  devServer: {
    port: 3000,
    client: {
      logging: "none",
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
    ],
  },
}
