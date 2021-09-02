const callbacks = []
let pending = false

// 执行回调函数
function flushCallbacks () {
  pending = true
  const cbs = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0, len = cbs.length; i < len; i++) {
    cbs[i]()
  }
}

const microFunc = () => {
  Promise.resolve().then(flushCallbacks)
}

/**
 * 如果传入回调函数函数就执行回调函数，如果不传入回调函数就返回一个 Promise
 * @param {Function} cb 回调函数
 * @param {*} ctx 执行上下文
 */
function nextTick (cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (typeof cb === 'function') {
      cb.call(ctx)
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    microFunc()
  }

  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}