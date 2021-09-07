function deepClone (target, cache = new WeakMap()) {
  
  // 基础数据类型
  if (!target instanceof Object) return target
  
  // 设置缓存，避免循环引用
  if (cache.get(target)) {
    return cache.get(target)
  }

  // 拷贝函数
  if (target instanceof Function) {
    return function () {
      return target.apply(this, arguments)
    }
  }

  // 拷贝日期对象
  if (target instanceof Date) {
    return new Date(target)
  }

  // 拷贝正则
  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags)
  }

  // 处理数组和对象
  const res = Array.isArray(target) ? [] : {}
  cache.set(target, res)
  Object.keys(target).forEach(item => {
    const curr = target[item]
    if (curr instanceof Object) {
      deepClone(curr, cache)
    } else {
      res[item] = curr
    }
  })
  return res
}