/**
 * 使用 reduce 模拟数组的 map 方法
 * @param { Function } callback 回调函数
 * @param {*} ctx 传入的执行上下文
 * @returns { Array }
 */
Array.prototype.reduceMap = function (callback, ctx) {
  if (this == null) {
    throw new Error(`${this} is null or undefined`)
  }

  if (typeof callback !== 'function') {
    throw new Error(`${callback} is not a function`)
  }
  // 跟使用 reduce 利用 Promise 处理请求串连异曲同工
  // 巧妙使用 reduce 的 默认值，传入一个 空数组
  // 将 reduce 的每次循环都利用 index 给 默认值数组赋值，最后将此数组返回
  return this.reduce(function (prev, curr, index, arr) {
    prev[index] = callback.call(ctx, curr, index, arr);
    return prev
  }, [])
}