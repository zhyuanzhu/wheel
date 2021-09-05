module.exports = class MyPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    console.log('My plugin is excuted')
    console.log('My plugin options: ', this.options)
    // console.log(compiler)
  }
}