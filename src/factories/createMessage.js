import { Destroyable } from "../classes/Destroyable"
import { Renderable } from "../classes/Renderable"

const ELEMENT = 'p'

export function createMessage(message) {
  const dom = document.createElement(ELEMENT)
  dom.innerHTML = message
  return Object.assign({}, new Destroyable(dom), new Renderable(dom))
}
