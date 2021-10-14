# 模块

## AMD 规范模块

> Asynchronous Module Definition，即 异步定义模块

- 核心API

  - define 方法用于定义一个模块

  - require 方法用于真正执行模块，通常 AMD 模块会以 require 方法作为入口，进行依赖关系分析并依次有序地进行加载

- 解决了什么问题

  - 通过依赖数组的方式声明依赖关系，具体依赖加载交给具体的 AMD 框架处理

  - 避免声明全局变量带来的环境污染和变量冲突问题

  - 模块是异步加载到，防止 js 加载阻塞页面渲染

- 主流框架：requireJs 和 curl.js

## CMD 规范模块

> Common Module Definition，通用模块定义

- 核心 API

  - 没有提供前置的依赖数组，而是接收一个 factory 函数，这个 factory 函数包括3个参数

    - require：一个方法标识符，调用它可以动态的获取一个依赖模块的输出

    - exports：一个对象，用于对其他模块提供输出接口，例如 exports.name = 'xxx'

    - module：一个对象，存储了当前模块相关的一些属性和方法，其中 module.exports 属性等同于 exports

- CMD 和 AMD 规范的区别

  - 依赖处理上

    - AMD 推崇依赖前置，即通过依赖数组的方式提前声明当前模块的依赖

    - CMD 推崇依赖就近，在编程需要用到的时候通过 require 方法动态引入

  - 模块对外输出上

    - AMD 推崇对外返回值的方式输出

    - CMD 推崇通过给 module.exports 赋值的方式输出

- 主流框架：sea.js

## CommonJS 模块

> 每个文件就是一个模块，有自己的作用域。文件里面定义的 变量、函数、类都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载；在浏览器端，模块需要提前编译打包处理

- 核心 API

  - require：引入一个模块

  - module.exports：对外暴露模块的内容 module.exports = xxx 或者 exports.xx = xxx

- 特点

  - 所有代码都运行在模块作用域，不会污染全局作用域

  - 模块可以多次加载，但是只会在第一次加载的时运行一次，然后运行结果就被缓存了，以后再加载，直接读取缓存

  - 模块加载的顺序，按照代码中出现的顺序

- 模块加载机制

  - 输入的是被输出的值的拷贝

## ES6 模块化

> ES6模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

**ES6 模块和 CommonJS 模块的区别**

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

- CommonJS 是运行时加载，ES6 模块是编译时输出接口

- CommonJS 的 require() 函数是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段

## UMD 模块

> 一个自执行函数，最终导出一个模块；根据使用要求生产模块
```js
  (function () {
    
  }())

  (function (factory) {
    
  }(function () {
    var a, b, c
    function a1 () {}
    function b1 () {}
    function c1 () {}
    return {
      a: a1,
      b: b1
    }
  }))

```

