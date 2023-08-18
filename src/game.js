import loop from "./loop"
import time from "./time"
import player from "./player"
import { View } from "./classes/View"
import logger from "./logger"
import keyboard from "./keyboard"
import sendMessageToPlayer from "./sendMessageToPlayer"

class Game {
  constructor() {
    let isStarted = false;

    sendMessageToPlayer('press "f" to start the machine', 'f', () => this.start());

    /* set output system */
    const view = new View()

    this.start = () => {
      sendMessageToPlayer('Welcome!<br>press "l" to start the logger', 'l', () => {
        view.append(logger.get())

        const content = document.createElement('div')
        view.append(content)

        /* set player input system */
        keyboard.on('keypress', e => {
          // console.log(e.key)
          // logger.log(e.key)
          if (e.key === 'a') loop.start()
          if (e.key === 's') loop.stop()
          // if (e.key === 'f') {
          //   if (isStarted) return
          //   this.start()
          // }
        })

        logger.log('press "a" to start loop engine, "s" to stop it')
        // content.append(player.get())
        // content.append(time.get())
        // content.append(loop.get())
        const frameDisplay = document.createElement('div')
        content.append(frameDisplay)


        /* set process system */
        loop.observe('frame', (frame) => {
          frameDisplay.innerText = `[game.js] frame: ${frame}`
        })
        // loop.start()
        // setTimeout(() => {
        //   loop.stop()
        // }, 1000)
      });


      isStarted = true
    }

    this.get = view.get
  }
}

const game = new Game()

export default game