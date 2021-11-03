class SleepChainEvent {
  constructor (name) {
    this.name = name
    this.tasks = []
    setTimeout(() => {
      this.next()
    })
  }

  say () {
    this.tasks.push(() => {
      console.log(`我的名字是：${this.name}`)
      this.next()
    })
    return this
  }

  play (gameName) {
    this.tasks.push(() => {
      console.log(`我正在玩${gameName}`)
      this.next()
    })
    return this
  }

  sleep (delay) {
    this.tasks.push(() => {
      console.log(`time start`, +new Date())
      setTimeout(() => {
        console.log(`time end`, +new Date())
        this.next()
      }, delay)
    })
    return this
  }

  next () {
    const task = this.tasks.shift()
    task && task()
    return this
  }

}


