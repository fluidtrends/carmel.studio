const path = require('path')
const userHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
const webpack = require('webpack')
const crypto2 = require('crypto-js')

module.exports = {
  entry: './src/main/index.ts',
  module: {
    rules: require('./webpack.rules'),
  },
  node: {
    __dirname: true,
    __filename: true
  },
  target: "electron-main",
  plugins: [
    new webpack.ProvidePlugin({
  })],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      carmel: path.resolve(userHome, '.carmel'),
      carmelbundle: path.resolve(userHome, '.carmel', 'bundles'),
      dlv: path.resolve('./node_modules/dlv/dist/dlv.js'),
    },
    fallback: {
      crypto: require.resolve("crypto-browserify")
    }
  },
}
