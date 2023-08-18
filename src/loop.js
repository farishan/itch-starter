import { Observable } from "./classes/Observable"
import { View } from "./classes/View"

class Loop extends Observable {
  constructor() {
    super()
    const self = this
    const view = new View()
    const content = document.createElement('div')

    let frame = 0
    let shouldRun = false

    content.innerHTML = `frame: ${frame}`
    view.set(content)

    function loop() {
      frame++
      self.notify('frame', frame)
      content.innerHTML = `[loop.js] frame: ${frame}`

      if (shouldRun) requestAnimationFrame(loop)
    }

    this.start = () => {
      if (shouldRun) return
      shouldRun = true
      requestAnimationFrame(loop)
    }

    this.stop = () => shouldRun = false

    this.get = view.get
  }
}

const loop = new Loop()

export default loop