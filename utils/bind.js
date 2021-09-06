Function.prototype._bind = function (thisArg, ...args) {

  let bindFn = this
  let fNop = function () {}
  let fBound = function () {
    // 处理在 new 函数调用 bind 返回的函数时候， this 和 fNop 相同
    return bindFn.apply(fNop.prototype.isPrototypeOf(this) ? this : thisArg, [...args, ...arguments])
  }

  // 设置原型处理，是为了和原函数保持一致；如果原函数的 prototype 不是 Funciton.prototype，则更改此处
  if (this.prototype) {
    fNop.prototype = this.prototype
  }
  fBound.prototype = new fNop()
  return fBound
}

Function.prototype._bindF = function (thisArg, ...args) {
  const fn = this
  const boundFunc = function (...others) {
    return fn.call(new.target ? this : thisArg, ...args, ...others)
  }
  boundFunc.prototype = Object.create(fn.prototype)
  boundFunc.prototype.constructor = boundFunc
  return boundFunc
}