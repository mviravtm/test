require('postcss-svg');

const path = require('path');

const projectPath = path.resolve(__dirname, '../../');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.jsx'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('beta'),
      },
    }),
    new TransferWebpackPlugin([{ from: 'src/static' }]),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
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
