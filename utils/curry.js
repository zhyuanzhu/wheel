/**
 * 函数柯里化
 * 柯里化函数的参数是一个函数 fn，函数 fn 有 n 个参数。调用柯里化之后的函数 fn1，返回一个新的函数，该函数可以处理继续传入的参数，处理结果与直接调用 fn 函数一次性传入 n 个参数的结果一致
 * @param { Function } func 
 * @returns 
 */
function curry (func) {
  return function curriedFn(...args) {
    // 如果传入的参数个数小于 func 函数定义的形参个数
    if (args.length < func.length) {
      // 递归调用处理，将每次传入的参数拼接起来，直至和 func 的形参个数相同
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }

    return func(...args)
  }
}
