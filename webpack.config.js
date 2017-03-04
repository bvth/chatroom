'use strict'
const webpack           = require('webpack');
const path              = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const BUILD_DIR         = path.resolve(__dirname, 'dist');
// const APP_DIR           = path.resolve(__dirname, 'src');


module.exports = {
  entry: './src',
  output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
  },
  // cache: true,
  // debug: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'ReactJS Hello World',
  //     xhtml: true,
  //     inject: false,
  //     template: require('html-webpack-template'),
  //     appMountId: 'root-container'
  //   }),
  //   new ExtractTextPlugin('/css/[name].css', {
  //     allChunks: true
  // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  module : {
    loaders: [
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel?presets[]=react,presets[]=es2015']
      },
      {
          test: /\.sass$/,
          loader: "style!css!sass?indentedSyntax"
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      }
    ]
  }
};
