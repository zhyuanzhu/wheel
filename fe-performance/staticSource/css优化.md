# CSS优化

- 提升 CSS 渲染性能

  - 谨慎使用 expensive 属性，如 ：nth-child 伪类；position: fixed 定位

  - 尽量减少样式层级数

  - 尽量避免使用占用过多 CPU 和内存属性，例如：text-indent: -99999px

  - 尽量避免使用耗电量大的属性，例如： CSS3 3D transforms, CSS3 transitions, Opacity

  - 尽量避免使用 CSS 表达式，例如：background-color: expression((new Date()).getHours()%2? '#fff' : '#000')

  - 尽量避免使用通配选择器，例如：div a {}

  - 尽量避免类正则的属性选择器，例如：*=  $=

  - 使用外链的 CSS，可放置 cdn，利用缓存

  - 尽量避免使用 @import，会阻塞 css 加载

- 合理使用 Web Fonts

  - 部署 CDN

  - base64 形式保存在 css 中，并通过 localStorage 进行缓存

  - 一些国外的资源使用国内的托管服务

- CSS 动画优化

  - 尽量避免同时动画，例如用户访问的当前屏幕区间里面不要有过多的动画，太多会打乱用户对网站的整体浏览，也会影响浏览器性能

  - 延迟动画初始化，保证其他 css 正常渲染

  - 借助 svg 展示动画

