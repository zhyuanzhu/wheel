/**
 * 节流函数
 * 在某段时间范围内只处理第一次触发，直至 wait 时间之后再可以触发....依次类推
 * 非常适用于函数被频繁调用的场景，例如 window.resize() 事件
 * @param {Function} fn 需要节流处理的函数
 * @param {Number} wait 等待时间
 */
function throttle (fn, wait = 1000) {
  // 利用时间戳来实现
  let prev = 0
  return function (...args){
    let now = +new Date()
    if (now - prev > wait) {
      prev = now
      fn.apply(this, args)
    }
  }
}


function throttle2 (fn, wait) {
  // 利用定时器实现
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}