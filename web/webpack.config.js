
const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: "web",

  entry: '../build/main.js',
  output: {
    filename: 'planner.js',
    globalObject: 'self',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ],
  },
  externals: {
    vscode: 'commonjs'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
    extensions: ['.js'],
    alias: {
    //   common: path.resolve (__dirname, "./out/common/")
    },
    fallback: {
      "buffer": require.resolve ("buffer")
    }
  },
  plugins: [
    new webpack.ProvidePlugin ({
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.ProvidePlugin ({
      process: 'process/browser'
    })
  ],
  mode: "development"
};