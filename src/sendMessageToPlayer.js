import { createMessage } from "./factories/createMessage";
import keyboard from "./keyboard"

const NAME = 'sendMessageToPlayer'

/**
 * @param {string} message message for player
 * @param {string} dismisser keyboard key to dismiss the message
 * @param {Function} callback function to be called after the message dismissed
 */
export default function sendMessageToPlayer(message, dismisser, callback) {
  const _message = createMessage(message)

  _message.render()

  keyboard.addNamedListener('keypress', NAME, e => {
    if (e.key !== dismisser) return

    _message.destroy()
    keyboard.removeNamedListener('keypress', NAME)
    callback()
  })
}
