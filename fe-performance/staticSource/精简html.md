# 精简 HTML 代码

## HTML

- 减少 HTMl 嵌套

- 减少 DOM 节点数

- 减少无语义代码

- 删除 http 或者 https，如果 url 的协议头与当前页面的协议头保持一致，或者此 url 在多个协议头都是可用的，则可以考虑删除协议头

- 删除多余的空格、换行符、锁进和不必要的注释

- 省略冗余标签和属性

- 使用相当路径的 url

## CSS

- CSS 文件样式链接尽量放在头部

  - CSS 加载不会阻塞 DOM tree 解析，但会阻塞 DOM tree 渲染，也会阻塞后面 js 的执行

## js

- js 引用放在 HTML 底部

  - 防止 js 的加载、解析、执行对阻塞页面后续元素的正常渲染