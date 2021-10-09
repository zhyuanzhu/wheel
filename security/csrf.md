# CSRF 攻击

> CSRF (Cross-site request forgery) 跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的

## CSRF 攻击分类

- GET 类型

  - GET 类型的 CSRF 利用非常简单，只需要一个 HTTP 请求  http://xxx.com?amount=100&f=hacker

- POST 类型

  - 一个隐藏的 form 表单提交  document.forms[0].submit()

- 链接类型的 CSRF

  - 需要用户点击行为才能触发，通常利用在图片中嵌入恶意链接或者以广告形式诱导用户中招，通常会用比较夸张的广告词语诱导用户

## CSRF 攻击特点

- 攻击一般发生在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生

- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据

- 整个过程，攻击者并不能获取受害者的登录凭证，仅仅是 “冒充”

- 跨站请求可以用各种方式：图片 url，超链接，CORS，form 提交等

- 通常是跨域的，因为外域更容易被掌控

## CSRF 的防控策略

-  阻止不明外域的访问

  - 同源检测：Origin Header，Referer Header
  
  - Samesite Cookie

- 提交时要求附加本域才能获取信息

  - CSRF token

  - 双重 cookie 验证

    - 接口服务写入 cookie，前端获取该 cookie 信息，并将该 cookie 作为参数提交给后台；后台校验 cookie 信息和写入是否一致；利用 CSRF 攻击无法获取到用户 Cookie 的特点