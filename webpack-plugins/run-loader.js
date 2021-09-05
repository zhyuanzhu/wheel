const { runLoaders } = require('loader-runner');
const fs = require('fs')
const path = require('path')

/** 处理 测试处理 */

// runLoaders({
//   resource: path.join(__dirname, './src/loaders/demo.txt'),
//   loaders: [
//     {
//       loader: path.join(__dirname, './src/loaders/raw-loader.js'),
//       options: {
//         name: 'James'
//       }
//     }
//   ],
//   context: {
//     minimize: true,
//   },
//   readResource: fs.readFile.bind(fs)
// }, (err, result) => {
//   err ? console.log(err) : console.log(result)
// })

/** 雪碧图 loader */
runLoaders({
  resource: path.join(__dirname, './src/loaders/demo.css'),
  loaders: [path.join(__dirname, './src/loaders/sprite-loader.js')],
  readResource: fs.readFile.bind(fs),
}, (err, result) => {
  err ? console.log(err) : console.log(result)
})