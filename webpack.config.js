const path = require('path');

module.exports = {
  entry: path.resolve('public/js/app.js'),
  output: {
    path: path.resolve('public/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015','es2016','es2017','react']
        }
      }
    ]
  }
};
