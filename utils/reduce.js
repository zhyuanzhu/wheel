/**
 * 模拟了一个 reduce
 * @param {Function} callback 
 * @param {*} initValue 
 * @returns 
 */
Array.prototype._reduce = function (callback, initValue) {
  if (this == null) {
    throw new Error('`this` is null or undefined')
  }

  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }

  const { length } = this;
  let index = 0
  let value

  // 判断是否传入了初始值，如果传入了初始值，直接将其赋值给 value
  if (arguments.length > 2) {
    value = initValue
  } else {
    // 如果 index 小于数组的长度，index 初始化是 0，且数组当前项不是 undefined 直接跳过 while 循环，进入下一步
    // 如果 数组当前项是 undefined，进入 while 循环，直到找出 当前项不是 undefined
    while(index < length && this[index] === undefined) {
      index++
    }

    // 如果是空数组，则默认 index = 0 length = 0
    // 如果数组种的每一项都是 undefined，while 循环之后 index = length
    if (index >= length) {
      throw new Error('Reduce of empty array not need initial value')
    }

    // 如果上面都不合适，给初始值 value 赋值后 将 索引 +1
    value = this[index++]
  }

  // 遍历数组种的每一项
  // 此时 index 保守为 1
  while(index < length) {
    // 如果当前项，如果当前项 存在
    if (this[index] !== undefined) {
      // 根据 reduce 回调函数的规则传入参数
      // 前面的累积值，当前值，当前索引，数组
      value = callback(value, this[index], index, this)
    }
    index++
  }

  // 返回 累计的 value
  return value

}