# js优化

## 优化原则

- 当需要时才优化：大改版，无法维护时

- 考虑代码的可维护性

## 提升 js 文件加载性能

- 尽量使用 id 选择器

- 尽量减少使用 eval

- js 函数尽量保持简洁

- 使用事件节流函数

- 使用事件委托

## js 动画

- 避免添加大量 js 动画

- 尽量使用 css3 动画

- 尽量使用 canvas 动画

- 合理使用 requestAnimationFrame 动画代替 setTimeout、setInterval

  - setTimeout 和 setInterval 的 callback 无法保证 callback 回调函数的执行时机

  - requestAnimationFrame 可以保证正确的执行时机

## 合理使用缓存

- js缓存的策略和技术选型

  - sessionStorage：存储一个键值对，单页面应用页面之间传值。关闭页面会被清除

  - indexedDb

    - 客户端存储大量结构化数据

    - 没有网络链接点的情况下可使用，比如一些在线文档

    - 将冗余、很少修改、但经常访问的数据，以避免随时从服务器获取数据

  - localStorage：本地存储

    - 缓存静态文件内容

    - 缓存不常变更的 API 接口数据

    - 浏览在页面的具体位置

    - 缓存一些地理位置信息，推广一些地域相关的信息

## 模块化加载方案和技术选型

- CommonJs 规范，同步加载

- AMD 规范：异步模块定义规范， RequireJS

- CMD 规范：通用模块定义规范， SeaJS

- ES6 import：不足之处，需要 babel 编译

