/**
 * new 的作用
 * 1 创建一个对象
 * 2 将新创建对象的原型指向构造函数的原型对象
 * 3 绑定 this 至新创建的对象
 * 4 如果函数的返回值不是对象，则返回新创建的该对象，否则返回原返回值
 * @param {*} Ctor 
 * @param  {...any} args 
 */

function createNew (Ctor, ...args) {

  const toString = Object.prototype.toString
  const isFunction = toString.call(Ctor) === '[Object Function]'
  if (!isFunction) {
    throw new Error(`${Ctor} is not a function`)
  }

  // 1, 2步骤
  let o = Object.create(Ctor)

  // 也可以 o = {} Object.setPrototype(o, Ctor.prototype)

  // 绑定 this
  let ret = Ctor.apply(o, args)
  return ret instanceof Object ? ret : o
}