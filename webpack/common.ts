import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin"; // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
import svgToMiniDataURI from "mini-svg-data-uri";
import "webpack-dev-server";

const Common: webpack.Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    path: path.join(__dirname, "../dist"), // 打包后的文件存放的地方
    filename: "[name].js", // 打包后输出文件的文件名
    chunkFilename: "[name].[contenthash].chunk.js",
  },
  resolve: {
    extensions: [
      ".wasm",
      ".mjs",
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
      ".svg",
    ],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.join(__dirname, "../node_modules/.cache/webpack"),
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ["style-loader", "css-loader"], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      // {
      // 	test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
      // 	use: ['style-loader', 'css-loader', 'sass-loader'], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      // },
      {
        test: /\.(j|t)s(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: "thread-loader" },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 浏览器版本查询及意思：https://github.com/browserslist/browserslist#full-list
                    targets: ["last 2 version", "> 1%"],
                    // 当文件里被使用时, 添加特定的引入来语法填充, 我们利用它, 一个打包的文件只会加载一次相同的语法填充
                    useBuiltIns: "usage",
                    // 指定corejs的版本
                    corejs: "3",
                    // modules: 'commonjs',
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
                "@babel/preset-typescript",
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { version: "legacy" }],
                "@babel/plugin-transform-runtime",
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
        resourceQuery: /url/, // *.svg?url
        generator: {
          dataUrl: (content: any) => {
            content = content.toString();
            // https://github.com/tigt/mini-svg-data-uri
            return svgToMiniDataURI(content);
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        // @svgr/webpack在webpack中使用：https://react-svgr.com/docs/webpack/
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(bmp|png|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"), // new一个这个插件的实例，并传入相关的参数
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
  ],
};

export default Common;
