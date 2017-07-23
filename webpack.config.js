var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static/bin');
var APP_DIR = path.resolve(__dirname, 'static');

var config = {
  entry: APP_DIR + '/gerry.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
};

module.exports = config;