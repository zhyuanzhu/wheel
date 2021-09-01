Array.prototype._forEach = (callback, thisArg) => {
  if (this == null) {
    throw new Error('`this` is null or undefined')
  }

  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }

  for (let i = 0, len = this.length; i < len; i++) {
    callback.call(thisArg, this[i], i, this)
  }

}