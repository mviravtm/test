const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname, '../../');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const env = process.env.NODE_ENV || 'dev';
const envAppConfigURL = path.resolve(__dirname, `../app/${env}.js`);

module.exports = {
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[hash].chunk.js',
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(projectPath, 'src'),
      path.resolve(projectPath, 'node_modules'),
      path.resolve(projectPath, 'static'),
    ],
    alias: {
      Config: fs.existsSync(envAppConfigURL) ? envAppConfigURL : path.resolve(__dirname, 'dev.js'),
      Utils: path.resolve(projectPath, 'src/shared/utils/index.js'),
      Components: path.resolve(projectPath, 'src/shared/components/'),
      Actions: path.resolve(projectPath, 'src/shared/actions/'),
      Types: path.resolve(projectPath, 'src/shared/types/'),
      Schemas: path.resolve(projectPath, 'src/shared/schemas/'),
      Selectors: path.resolve(projectPath, 'src/shared/selectors/'),
      Images: path.resolve(projectPath, 'src/shared/assets/images/'),
      Icons: path.resolve(projectPath, 'src/shared/assets/icons/'),
      Styles: path.resolve(projectPath, 'src/shared/assets/styles/'),
      shared: path.resolve(projectPath, 'src/shared/'),
    },
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /^\.\/locale$/,
      /cz.js|de.js|en.js|es.js|fr.js|hu.js|it.js|pl.js|ru.js|sv.js|tr.js|uk.js|zh.js/,
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss',
    }),
  ],
  module: {
    // Disable handling of requires with a single expression
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    // Disable handling of requires with expression wrapped by string,
    wrappedContextRegExp: /$^/,
    wrappedContextCritical: false,
    loaders: [{ test: /\.json$/, loader: 'json' }],
    rules: [
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\/icons\/.*\.svg$/,
        loaders: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { cleanupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeNonInheritableGroupAttrs: true },
                { collapseGroups: true },
                { convertShapeToPath: true },
                { removeScriptElement: true },
                { removeEmptyContainers: true },
                { removeHiddenElems: true },
                { moveGroupAttrsToElems: true },
              ],
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg)$/,
        include: /(images)/,
        use: 'url-loader',
      },
    ],
  },
};
