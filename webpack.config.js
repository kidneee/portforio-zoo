const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {},

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: false,
            },
          },
          'template-ejs-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/top.ejs'),
      filename: 'index.html',
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [{from: 'public/assets', to: 'assets'}],
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
