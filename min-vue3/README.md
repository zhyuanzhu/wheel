# 响应式

## reactive

- 将需要响应式处理的对象使用 `reactive` 函数处理，过程中使用了 `new Proxy` 做了依赖收集

  - 将 target 作为 key 存储在 weakMap 中

  - 将 target 的 响应式处理过程作为 value 存储在 weakMap 中的对应值中；其中每个 value 值都是一个 Map 对象

  - 将 targrt 中的 key 作为 "key"，将 Set 做为值存储在 target 对应的 Map 中

  - 将 key 对应的处理函数存在到 Set 中；完成数据的依赖收集

- 需要触发更新的时候，从 weakMap 中 查找到 target 对应的 Map，从该 Map 中查找到 key 对应的 Set；遍历该 Set，依次触发每一项

## ref

- ref 可以将基本数据类型转换成 响应式对象

- 赋值需要给对应的 key.value = xxx