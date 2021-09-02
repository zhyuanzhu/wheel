const xhr = new XMLHttpRequest()

xhr.open('get', './demo.txt', false)

// get 请求直接发送send(null), 参数已经拼接到 url 上了
// post 请求需要将请求数据 data 发送，send(data)
// 如果是 formData，直接把 formData 发送了
xhr.send(null)

// readyState 状态
// 0 未初始化，尚未调用 open
// 1 已打开，已经调用了 open 但未 send
// 2 已发送，未收到响应 已 send
// 3 接收种，已收到部分响应
// 4 完成，已经收到所有响应，可以使用了

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText)
    } else {
      alert(`Request error: ${xhr.status}`)
    }
  }
}