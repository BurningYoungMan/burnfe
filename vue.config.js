const webpack = require("webpack")

module.exports = {
  // eslint检查代码
  lintOnSave: false,
  // publicPath: "./",
  // publicPath: '/static/burn/',
  publicPath: process.env.NODE_ENV === 'production' ? '/static/burn/' : './',
  // 静态资源 (js、css、img、fonts)
  assetsDir: "static",
  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: 'http://10.1.1.174',
    
    before: (app) => {},
  },
  pluginOptions: {},
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
      }),
    ],
  },
}
