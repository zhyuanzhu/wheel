// 发布订阅实现一个简单的自定义事件
class EventEmitter {
  constructor () {
    this.subs = Object.create(null)
  }

  $on (eventName, cb) {
    if (typeof cb !== 'function') {
      throw new Error(`'$on' eventHandler callback must be a function, but get ${cb}`)
    }
    if (!this.subs[eventName]) {
      this.subs[eventName] = []
    }
    this.subs[eventName].push(cb)
  }

  $emit (eventName) {
    const eventList = this.subs[eventName]
    if (!eventList) return
    eventList.forEach(cb => cb())
  }

}


const bus = new EventEmitter()

bus.$on('test', () => {
  console.log('test')
})

bus.$on('test', () => {
  console.log('test again')
})

bus.$emit('test')

// 有一个事件中心的概念，将发布者和订阅者之间的依赖隔离，减少发布者和订阅者之间的依赖关系