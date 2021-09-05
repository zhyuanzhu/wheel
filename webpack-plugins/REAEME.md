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

- 参数校验阶段可以直接 throw 的方式抛出
```js
  throw new Error('Error Message')
```

- 通过 compilation 对象的 warnings 和 errors 接收
```js
  compilation.warnings.push('warnings')
  compilation.errors.push('error')
```

- **apply 方法**
```js
  apply(compiler) {}
```

- 压缩构建资源插件，生成zip包

