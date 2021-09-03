const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const DEFAULT_SUCCESS_CALLBACK = v => v;
const DEFAULT_FAIL_CALLBACK = err => {
  throw err;
}


class Promise {
  constructor (executor) {
    try {
      executor(this.resolve, this.rejected)
    } catch (error) {
      this.reject(error)
    }
  }

  // Promise 状态记录
  status = undefined

  // 成功之后的值
  value = undefined

  // 失败的原因
  reason = undefined

  // 用来存储成功的回调函数，用于处理异步 resolve
  successCallback = []

  // 失败回调函数，用户处理异步 reject
  failCallback = []

  resolve = (value) => {
    if (this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) {
      const firstSuccCb = this.successCallback.shift()
      firstSuccCb()
    }
  }

  reject = (err) => {
    if (this.status != PENDING) return
    this.status = REJECTED
    this.reason = err
    while (this.failCallback.length) {
      const firstFailCb = this.failCallback.shift()
      firstFailCb()
    }
  }



}