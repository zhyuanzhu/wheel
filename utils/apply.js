Function.prototype._apply = function (thisArg, args) {
  thisArg = thisArg ? Object(thisArg) : window
  let result = null
  const temp = Symbol('apply')
  thisArg[temp] = thisArg
  if (args) {
    result = thisArg[temp](...args)
  } else {
    result = thisArg[temp]
  }
  delete thisArg[temp]
  return result
}