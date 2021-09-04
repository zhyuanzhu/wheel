const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const DEFAULT_SUCCESS_CALLBACK = v => v;
const DEFAULT_FAIL_CALLBACK = err => {
  throw err;
}


class _Promise {
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

  static all (array) {
    const result = []
    let index = 0
    const { length } = array

    return new _Promise((resolve, reject) => {

      function addData (key, value) {
        result[key] = value
        index++
        if (index === length) resolve(result)
      }

      for (let i = 0; i < length; i++) {
        let curr = array[i]
        if (curr instanceof _Promise) {
          curr.then(val => addData(i, val), err => reject(err))
        } else {
          addData(i, curr)
        }
      }

    })
  }

  static race (array) {
    return new _Promise((resolve, reject) => {
      for (let i = 0, len = array.length; i < len; i++) {
        const curr = array[i]
        if (curr instanceof _Promise) {
          curr.then(val => resolve(val), err => reject(err))
        } else {
          resolve(curr)
        }
      }
    })
  }

  static resolve (data) {
    if (data instanceof _Promise) return data
    return new _Promise(resolve => resolve(data))
  }

  static reject (err) {
    if (err instanceof _Promise) return err
    return new _Promise(_, reject => reject(err))
  }



}