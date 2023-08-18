import { View } from "./classes/View"

class Time {
  constructor() {
    const view = new View()
    const content = document.createElement('div')

    content.innerHTML = new Date().toString()
    setInterval(() => {
      content.innerHTML = new Date().toString()
    }, 1000)

    view.set(content)

    this.get = view.get
  }
}

const time = new Time()

export default time