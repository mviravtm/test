const fs = require('fs');
const merge = require('webpack-merge');
const devConfig = require('./config/webpack/dev.js');
const baseConfig = require('./config/webpack/base.js');

const env = process.env.NODE_ENV || 'dev';
const envConfigURL = `./config/webpack/${env}.js`;
const envConfig = fs.existsSync(envConfigURL) // eslint-disable-next-line import/no-dynamic-require
  ? require(envConfigURL)
  : devConfig; // eslint-disable-line global-require import/no-dynamic-require

module.exports = merge(baseConfig, envConfig);
