class EventEmitter {
  constructor () {
    this.subs = new Map()
  }

  on (eventName, handler) {
    if (!this.has(eventName)) {
      this.subs.set(eventName, [])
    }
    const events = this.getEvents(eventName);
    events.push(handler);
    this.subs.set(eventName, events)
    // 方便处理链式调用
    return this
  }

  emit (eventName) {
    if (!this.has(eventName)) return
    this.getEvents(eventName).forEach(fn => fn())
  }

  off (eventName, handler) {
    if (!this.has(eventName)) return
    if (!handler) {
      this.subs.delete(eventName)
      return;
    }
    const events = this.getEvents(eventName).filter(item => item !== handler)
    this.subs.set(eventName, events)
  }

  once (eventName, handler) {
    const fn = (...args) => {
      handler.apply(this, args)
      this.off(eventName, fn)
    }
    this.on(eventName, fn)
  }

  has (eventName) {
    return this.subs.has(eventName)
  }

  getEvents (eventName) {
    return this.subs.get(eventName)
  }

}