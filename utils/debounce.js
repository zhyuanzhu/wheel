/**
 * 防抖函数
 * 间隔 wait 时间之后执行处理 fn 函数，无论在这个过程中触发多少次
 * 举个例子：
 * 公交车到站之后需要等最后一个乘客上车之后停留 wait 时间之后再关门，这个时候只要有新的乘客上车，就会重置 wait 时间，如果一直间隙有乘客，就导致公交车无法关门
 * @param {Function} fn 需要防抖处理的函数
 * @param {Number} wait 等待时间
 */
function debounce (fn, wait = 1000) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 存在的问题
 * 如果 用户操作非常频繁，不等延迟时间结束就执行下一次操作，会频繁的清除计数器并重新生成，函数 fn 一直都无法执行，导致用户操作得不到预期的响应
 * 
 * 在 wait 时间内，可以重新生成定时器，但是超出这个时间之后必须给用户响应
 */


const debounceUpgrade = (fn, wait) => {
  let prev = 0
  let timer = null
  return function (...args) {
    let now = +new Date()
    // 第一次触发就执行 或者 超时之后
    if (now - prev > wait) {
      prev = now
      fn.apply(this, args)
    } else {
      // 在 wait 等待时间段之内的处理逻辑
      if (timer) clearTimeout(timer)
      
      timer = setTimeout(() => {
        prev = now
        fn.apply(this, args)
      }, wait)
    }
  }
}