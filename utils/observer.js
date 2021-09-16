// 观察者模式

// 发布者
class Dep {
  constructor () {
    // 记录所有的订阅者
    this.subs = []
  }

  // 把订阅者添加进 subs 中
  add (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 通知
  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

// 观察者 --> 订阅者
class Watcher {
  // 事件触发的时候，由发布者调用
  update () {
    console.log('update')
  }
}

const dep = new Dep()

const watcher = new Watcher()

dep.add(watcher)

dep.notify()

// 目标对象发生改变，会通知所有的订阅者，调用订阅者对象中的 update 方法更新；
// 订阅者如果有需要，将自己添加进观察者中即可