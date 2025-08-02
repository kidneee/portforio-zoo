const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    mode: 'development',

    entry: {
      entry: path.resolve(__dirname, 'src/pages/index.ejs'),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: [
            'html-loader',
            {
              loader: 'template-ejs-loader',
              options: {
                // EJS の include 用パスのルート指定
                root: path.resolve(__dirname, 'src'),
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/pages/index.ejs'), // pages内にあるindex
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
      }),
    ],
  };
};
