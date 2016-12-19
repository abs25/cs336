var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: [
    __dirname + '/app/scripts/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: '/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/,  loader: 'style!css?modules!postcss' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"})
  ]
};
