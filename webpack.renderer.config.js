const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const path = require('path')
const webpack = require('webpack')
const userHome =
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

module.exports = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  target: "electron-renderer",
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      crypto: require.resolve("crypto-js"),
      assert: false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false
    }
  },
}
