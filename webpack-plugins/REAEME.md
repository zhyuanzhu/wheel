# webpack loader 和 插件的开发

## loader

> 处理静态资源

- 可以在 loader 函数中通过 `callback = this.callback()` 来返回数据，`callback` 函数的第一个参数是 **错误对象**，后面可以传入多个参数，是返回的数据

- 异步 `callback = this.async()`

```js
  const callback = this.async()
```

- **TODO：雪碧图 loader 处理图片位置**

## 插件

> 伴随 webpack 全程，可以处理任何；一个构造函数

