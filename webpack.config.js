var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var LIB_PATH = path.resolve(__dirname, 'lib');
var BUILD_PATH = path.resolve(__dirname, 'dist');
var DEMO_PATH = path.resolve(__dirname, 'demo');


module.exports = {
  devtool: '#source-map',
  // stats: {
  //   // watch: true,
  //   errors: true,
  //   progress: true,
  //   colors: true,
  //   modules: true,
  //   reasons: true
  // },

  entry: {
    // vendor: ['lodash'],
    app: LIB_PATH +'/Flick.js'
  },

  output: {
    path: BUILD_PATH,
    // publicPath: '/',
    filename: 'flick.js',
    library: 'Flick',
    libraryTarget: 'umd'
  },
  devServer: {
     contentBase: [DEMO_PATH, BUILD_PATH],
     hot: true
    },

  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: [ node_modules ],
        use: [
              {loader: 'babel-loader'}
        ]
      },
      {
        test: /\.(vs|fs)$/,
        use: 'raw-loader'
      }
   
    
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new CleanWebpackPlugin([BUILD_PATH])
    // new BrowserSyncPlugin({
    //   server: 'dist',
    //   open: true,
    //   logFileChanges: true
    //   // plugins: ['bs-fullscreen-message'],
    // })
  ]
}
