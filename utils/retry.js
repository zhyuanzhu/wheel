/**
 * 
 * @param {Promise} promiseFn  
 * @param {Number} maxCount 
 */
// function retry (promiseFn, maxCount) {
//   return new Promise(async (resolve, reject) => {
//     while(maxCount--) {
//       const result = await promiseFn()
//       result
//       .then(() => {
//         resolve(result)
//         maxCount = 0
//       })
//       .catch((error) => {
//         if (maxCount === 0) {
//           reject(error)
//         }
//       })
//     }
//   })
// }

function retry (promiseFn, maxCount) {
  if (maxCount === 1) {
    return promiseFn()
  }
  return promiseFn.then(data => data, () => retry(promiseFn, maxCount - 1))
}