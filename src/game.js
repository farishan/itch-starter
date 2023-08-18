import loop from "./loop"
import time from "./time"
import player from "./player"
import logger from "./logger"
import keyboard from "./keyboard"
import { View } from "./classes/View"
import sendMessageToPlayer from "./sendMessageToPlayer"

class Game {
  constructor() {
    let isStarted = false;
    const view = new View()

    sendMessageToPlayer('press "f" to start the machine', 'f', () => this.start());

    this.start = () => {
      sendMessageToPlayer('Welcome!<br>press "l" to start the logger', 'l', () => {
        view.append(logger.get())

        const content = document.createElement('div')
        const frameDisplay = document.createElement('div')
        content.append(frameDisplay)
        view.append(content)

        /* set player input system */
        keyboard.on('keypress', e => {
          if (e.key === 'a') loop.start()
          if (e.key === 's') loop.stop()
          if (e.key === 't') content.append(time.get())
          if (e.key === 'p') content.append(player.get())
          if (e.key === 'l') content.append(loop.get())
        })

        logger.log(`
          press one of these keys:
            <br>"a" to start loop engine, "s" to stop it.
            <br>"t" to append time
            <br>"p" to append player
            <br>"l" to append loop
        `)

        /* set process system */
        loop.observe('frame', (frame) => {
          frameDisplay.innerText = `[game.js] frame: ${frame}`
        })
      });

      isStarted = true
    }

    this.get = view.get
  }
}

const game = new Game()
export default game