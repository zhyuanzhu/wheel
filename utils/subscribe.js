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