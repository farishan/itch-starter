import { View } from "./classes/View"

class Player {
  constructor() {
    const view = new View()

    const content = document.createElement('div')
    content.innerHTML = 'hello from player'
    view.set(content)

    this.get = view.get
  }
}

const player = new Player()

export default player