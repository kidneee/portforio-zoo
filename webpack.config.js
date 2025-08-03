// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {}, // JS特に無ければ空でOK

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // distクリーン
  },

  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ['html-loader', 'template-ejs-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/top.ejs'),
      filename: 'index.html',
      minify: false,
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    port: 3000,
  },
};
