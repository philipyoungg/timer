export default class Timer {
  constructor(target = 60, options = {}) {
    this.target = target * 1000
    this.isTicking = false
    this.onUpdate = options.onUpdate
  }

  init() {
    this.reference = Date.now()
    this.elapsed = 0
    this.timeOnPaused = 0
    this.left = this.target
    this.progress = 0
    this.update()
  }

  refresh() {
    if (this.left < 0) {
      this.left = 0
      this.update()
      clearTimeout(this.timeout)
    } else {
      this.elapsed = (Date.now() - this.reference) + this.timeOnPaused
      this.left = this.target - this.elapsed
      this.progress = this.elapsed / this.target
      this.update()
      this.timeout = setTimeout(this.refresh.bind(this), 10)
    }
  }

  pause() {
    this.isTicking = false
    clearTimeout(this.timeout)
    this.timeOnPaused = this.elapsed
  }

  play() {
    if (!this.isTicking) {
      this.isTicking = true
      this.reference = Date.now()
      this.refresh()
    }
  }

  update() {
    this.onUpdate({
      secondLeft: Math.round(this.left / 1000),
      progress: this.progress,
    })
  }

  reset() {
    this.isTicking = false
    clearTimeout(this.timeout)
    this.init()
  }
}
