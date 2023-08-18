import { View } from "./classes/View"

class WindowEventProxy {
  view = new View()
  eventListener = {}

  constructor() {
    const dom = this.view.get()
    dom.style.border = '1px solid'
    dom.style.padding = '1rem'
  }

  addEventListener(eventKey, key, func) {
    // set default value
    if (!this.eventListener[eventKey]) this.eventListener[eventKey] = {}

    // save listener
    this.eventListener[eventKey][key] = func

    // add listener to real window
    window.addEventListener(eventKey, func)

    this.update()
  }

  removeEventListener(eventKey, key) {
    // remove listener from real window first
    window.removeEventListener(eventKey, this.eventListener[eventKey][key])

    // remove listener
    delete this.eventListener[eventKey][key]

    this.update()
  }

  update() {
    const listeners = []
    Object.keys(this.eventListener).forEach(eventKey => {
      Object.keys(this.eventListener[eventKey]).forEach(key => {
        listeners.push(eventKey + '/' + key)
      })
    })

    const contentRoot = document.createElement('pre')
    const content = document.createElement('code')
    contentRoot.append(content)
    content.innerHTML = JSON.stringify(listeners, [' '], 2)

    this.view.set(contentRoot)
  }

  get() {
    return this.view.get()
  }
}

const windowEventProxy = new WindowEventProxy()
export default windowEventProxy
