Array.prototype._map = function (callback, thisArg) {
  if (this == null) {
    throw new Error('`this` is null or undefined')
  }

  if (typeof callback !== 'function') {
    throw new Error('`callback` is not a function')
  }
  const { length } = this;

  const result = new Array(length);
  
  for (let i  = 0; i  < length; i++) {
    let curr = callback.call(thisArg, this[i], i, this)
    result[i] = curr
  }
  return result
}