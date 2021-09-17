const path = require('path')
const userHome =
  process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']

module.exports = {
  entry: './src/main/index.ts',
  module: {
    rules: require('./webpack.rules'),
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  target: "electron-main",
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      carmel: path.resolve(userHome, '.carmel'),
      carmelbundle: path.resolve(userHome, '.carmel', 'bundles'),
      dlv: path.resolve('./node_modules/dlv/dist/dlv.js'),
      "./node_modules/multiformats/cjs/src/hashes/sha2-browser.js": "./node_modules/multiformats/cjs/src/hashes/sha2.js" 
    },
  },
}
