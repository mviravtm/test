const path = require('path');

const projectPath = path.resolve(__dirname, '../../');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
    contentBase: ['/', path.join(projectPath, 'build'), path.join(projectPath, 'static')],
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    disableHostCheck: true,
    open: true,
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://0.0.0.0:3000',
    './src/client/index.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new TransferWebpackPlugin([{ from: 'src/static', to: '/' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(projectPath, 'src/static/index.ejs'),
      inject: 'body',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          '@plasma-platform/isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]~~~~[hash:base64:24]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          '@plasma-platform/isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]~~~~[hash:base64:24]',
            },
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    child_process: 'empty',
  },
};
