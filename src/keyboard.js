import windowEventProxy from "./window"

const keyboard = {
  on: (event, callback) => {
    windowEventProxy.addEventListener(event, 'keyboard', callback)
  },
  addNamedListener: (event, name, callback) => {
    windowEventProxy.addEventListener(event, `keyboard_${name}`, callback)
  },
  removeNamedListener: (event, name) => {
    windowEventProxy.removeEventListener(event, `keyboard_${name}`)
  }
}

export default keyboard