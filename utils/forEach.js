Array.prototype._forEach = (fn, thisArg) => {
  if (this == null) {
    throw new Error('`this` is null or undefined')
  }

  if (typeof fn !== 'function') {
    throw new Error('`fn` is not a function')
  }

  for (let i = 0, len = this.length; i < len; i++) {
    fn.call(thisArg, this[i], i, this)
  }

}