# 跨域

## 产生原因

**同源策略**：同源策略是一个重要的安全策略，它用于限制一个 `origin`（源）的文档或者它加载的脚本如何能与另一个源的资源进行交互；它能帮助阻隔恶意文档，减少可能被攻击的媒介

    两个 URL 的协议、端口、域名只要有一个不同，则属于跨域

## 跨域的解决方案

- JSONP

  - 利用 `srcipt` 或者 `img` 标签的 src 属性没有同源策略的限制，将回调函数名称 `callback` 作为参数拼接到 url 上，服务端拿到该参数之后，会把处理好的数据作为该参数的实参传入并返回前端，前端可以获取到对应的数值
    ```js
      function _jsonp ({ url, params, callback }) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          window[callback] = funciton (data) {
            resolve(data)
            document.body.removeChild(script)
          }

          let query = []
          params = {... params, callback}
          for (let key in params) {
            query.push(`${key}=${params[key]}`)
          }
          script.src = `${url}?${query.split('&')}`
          document.body.appendChild(script); 
        })
      }
      
    ```

  - 只支持 GET 请求

- CORS 跨域资源共享（`Cross-origin resource sharing`）

  - 服务端设置请求相关字段

    - Access-Control-Allow-Origin 必须，它的值是请求是 `origin` 字段的值，要么是一个 *，标识接受任意域名的请求

    - Access-Control-Allow-Credentials 可选字段，布尔值，表示是否允许发送 Cookie

    - Access-Control-Request-Method 必须，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法；不限于浏览器在 `预检` 中的请求字段（OPTIONS请求）

    - Access-Control-Max-Age 可选字段，用来指定本次预检请求的有效期，单位为秒