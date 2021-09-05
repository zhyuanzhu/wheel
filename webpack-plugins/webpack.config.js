const path = require('path')
const MyPlugin = require('./src/plugins/my-plugin')
const ZipPlugin = require('./src/plugins/zip-plugins')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'production',
  plugins: [
    new MyPlugin({
      name: 'my plugin'
    }),
    new ZipPlugin({
      filename: '007'
    })
  ]
}