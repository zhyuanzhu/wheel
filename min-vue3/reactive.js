// 将对象转换为响应式对象
// 创建拦截器对象，实现 get set deleteProperty

const hasOwnProperty = Object.prototype.hasOwnProperty

const isObject = v => v !== null && typeof v === 'object'

const convert = target => isObject(target) ? reactive(target) : target

const hasOwn = (target, key) => hasOwnProperty.call(target, key)

let activeEffect = null

let targetMap = new WeakMap()

export function reactive (target) {
  if (!isObject(target)) return target

  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      console.log(`get: ${key}`)
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },

    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let flag = true
      if (oldValue !== value) {
        flag = Reflect.set(target, key, value, receiver)
        // 触发更新
        console.log(`set: ${key}-- ${value}`)
        trigger(target, key)
      }
      return flag
    },

    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        console.log(`delete: ${key}`)
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)

}

export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}

export function track (target, key) {
  // 收集依赖
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)

}

// 触发更新
export function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (deps) {
    deps.forEach(effect => {
      effect()
    })
  }
}


// ref 函数
export function ref(raw) {
  // 判断 raw 是否是 ref 创建的 对象
  if (isObject(raw) && raw.__v_isRef) return raw
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value () {
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}
