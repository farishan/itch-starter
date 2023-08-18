import { View } from "./classes/View"

class Logger {
  constructor() {
    const view = new View()
    const root = document.createElement('div')
    const head = document.createElement('div')
    const body = document.createElement('div')

    const logs = []

    setUI()

    function setUI() {
      head.innerHTML = 'logger head'

      const toggleButton = document.createElement('button')
      toggleButton.onclick = () => {
        body.style.display = body.style.display === 'none' ? 'block' : 'none'
      }
      toggleButton.innerText = 'toggle logger visibility'
      head.append(toggleButton)

      body.innerHTML = 'logger body'

      root.style.border = '1px solid'
      root.style.maxHeight = '200px'
      root.style.overflowY = 'auto'

      root.append(head)
      root.append(body)
      view.set(root)
    }

    this.log = (message) => {
      logs.push(message)
      this.render()
    }

    this.render = () => {
      body.innerHTML = ''
      for (let index = logs.length-1; index >= 0; index--) {
        const log = logs[index];
        body.innerHTML += log + '<br>'
      }
    }

    this.get = view.get
  }
}

const logger = new Logger()

export default logger