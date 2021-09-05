const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')

module.exports = function (source) {

  const { name } = loaderUtils.getOptions(this);
  console.log(name);

  // 关闭缓存
  // this.cacheable(false)

  /** 同步 loader */
  // 异常，可以通过 throw Error 抛出
  // 也可以通过 this.callback(Error || null, result)
  // 如果需要抛出异常，第一个参数传递 error 对象，如果不需要，则传入 null
  // 第二个参数是处理后的结果值

  // const json = JSON.stringify(source)
  //   .replace(/\u2028/g, '\\u2028')
  //   .replace(/\u2029/g, '\\u2029');

  //   return `export default ${json}`

  /** 异步 loader */
  const callback = this.async();
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    if (err) {
      callback(err, '')
      return
    }
    callback(null, data)
  })

}