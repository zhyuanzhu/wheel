/**
 * 判断 instance 是否在 o 的原型链上
 * @param {*} o 
 * @param {*} instance 
 * @return { Boolean }
 */
function instanceOf (o, instance) {
  let curr = o
  while (curr) {
    if (curr === instance.prototype) {
      return true
    }
    curr = curr.__proto__
  }
  return false
}