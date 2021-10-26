# 跨域

## 产生原因

**同源策略**：同源策略是一个重要的安全策略，它用于限制一个 `origin`（源）的文档或者它加载的脚本如何能与另一个源的资源进行交互；它能帮助阻隔恶意文档，减少可能被攻击的媒介

    两个 URL 的协议、端口、域名只要有一个不同，则属于跨域

## 跨域请求预检

    跨域共享规范标准要求，对那些可能对服务器数据产生副作用的 http 请求方法（特别是 get 以外的 http 请求，或者搭配某些 mime 类型的 post 请求），浏览器必须首先使用一次 options 方法发起一个预检请求，从而获知服务端是否允许该跨域请求。

  - 简单请求

    - get, head, post；且 Content-Type 的值仅限于 application/x-www-form-urlencoded, multipart/form-data, text/plain

  - 复杂请求

    - 除了 get, head, post 之外的请求，例如 put, delete,

    - 设置了 Content-Type 的值不属于 application/x-www-form-urlencoded, multipart/form-data, text/plain 
    
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

- postMessage

  - window属性，主要解决以下问题

    - 页面和其打开的新窗口的数据传递

    - 多窗口之间传递消息

    - 页面与嵌套的 iframe 之间消息传递

  - window.postMessage(message, targetOrigin[, transger])

    - message：将要发送到其他 window 的数据

    - targetOrigin：指定哪些窗口能接收到消息事件，其值可以是字符串 '*' 或者一个 url

    - transger：是一串和 message 同时传递的 Transferable 对象。这些对象的所有权将被转移给消息的接收方，而发送一方将不再保留所有权 ????
  ```js
    // a
    const frame = document.querySelector('#ifram')
    frame.contentWindow.postMessage('xyz', '*')

    // b
    window.onmessage = (e) => {
      console.lgo(e.data)     // xyz
    }

  ```

- websocket

  > 实现 HTML5 的一个持久化协议，实现了浏览器与服务器之间的双工通信，同时也是跨域的一种解决方案；应用层协议，基于 TCP

  ``` js
    const socket = new WebSocket('ws://localhost:3000')
    socket.onopen = () => {
      socket.send('xyz')          // 向服务器发送消息
    }

    socket.onmessage = (e) => {
      console.log(e.data)       // 接收服务器返回的数据
    }

  ```

- node 中间代理层

  > 利用服务器之间不受同源策略限制

- nginx 反向代理

  > 利用 nginx 服务器转发请求

## 其他一些跨域

- COEP：跨源嵌入程序策略

  - Cross-Origin-Embedder-Policy：

    - require-corp：让站点加载明确标记可共享的跨域资源，或者是同源资源  （cross-origin/same-origin ???）

- COOP：跨源开放者策略

  - 设置头部 Cross-Origin-Opener-Policy: 

    - same-origin：将把从该网站打开的其他不同源的窗口隔离在不同的浏览器 Context Group ，这样就创建资源的隔离环境

    - same-origin-allow-popups：顶级页面会保留一些弹出窗口的应用

    - unsafe-none：默认设置，允许当前页面和弹窗页面共享 `Context Group`

    ```js
      // 浏览器 Context Group 是一组共享上下文的 tab、window 或 iframe
    ```

- CORP：跨域资源共享

  - 设置头部 Cross-Origin-Resource-Policy

    - same-site：只能从同一站点加载

    - same-origin：只能从相同的来源加载

    - cross-origin：可以由任何网站加载

- CORB：跨源读取阻止
