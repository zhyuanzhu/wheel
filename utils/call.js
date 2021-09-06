Function.prototype._call = function (thisArg, ...args) {

  thisArg = thisArg ? Object(thisArg) : window
  
  // 缓存一个 symbol ，防止 thisArg 对象上本身含有 自定义的属性
  const temp = Symbol('call')

  thisArg[temp] = this
  const result = thisArg[temp](...args)
  delete thisArg[temp]
  return result
}