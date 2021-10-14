# MVVM

> MVVM 是一种软件架构模式；有助于将 view 层与业务逻辑或后端逻辑（数据模型）的开发分离开来

- Model：用于封装与业务逻辑相关的 数据及对数据的处理，包括数据库

- View：视图层

- ViewModel：视图模型，有数据双向绑定的绑定器

View 的变动自动反应在 ViewModel；反之亦然

    View 与 Model 不发生联系，都是通过 ViewModel 传递

    View 非常薄，不部署任何业务逻辑；所有的业务逻辑都在 ViewModel