const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource

const zip = new JSZip()

module.exports = class ZipPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // 异步钩子
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename);
      for (let filename in compilation.assets) {
        // console.log(compilation.assets[filename])
        const source = compilation.assets[filename].source()
        // console.log(source)
        folder.file(filename, source)
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // console.log(content) // Buffer
        const outPutPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
        const outputRelativePath = path.relative(compilation.options.output.path, outPutPath)
        compilation.assets[outputRelativePath] = new RawSource(content)

        callback()
      })
    })
  }
}