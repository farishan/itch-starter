(() => {
  // src/classes/Observable.js
  var Observable = class {
    constructor() {
      const observersByKey = {};
      this.observe = (key, fn) => {
        if (!observersByKey[key])
          observersByKey[key] = [];
        observersByKey[key].push(fn);
      };
      this.unobserve = (key, fn) => {
        if (!observersByKey[key])
          observersByKey[key] = [];
        observersByKey[key] = observersByKey[key].filter((f) => f !== fn);
      };
      this.getObservers = (key) => {
        return observersByKey[key] || [];
      };
    }
    notify(key, message) {
      const observers = this.getObservers(key);
      for (let index = 0; index < observers.length; index++) {
        const observer = observers[index];
        observer(message);
      }
    }
  };

  // src/classes/View.js
  var View = class {
    constructor() {
      const root = document.createElement("div");
      this.get = () => root;
      this.set = (node) => {
        this.clear();
        this.append(node);
      };
      this.clear = () => root.innerHTML = "";
      this.append = (node) => root.append(node);
    }
  };

  // src/loop.js
  var Loop = class extends Observable {
    constructor() {
      super();
      const self = this;
      const view = new View();
      const content = document.createElement("div");
      let frame = 0;
      let shouldRun = false;
      content.innerHTML = `frame: ${frame}`;
      view.set(content);
      function loop2() {
        frame++;
        self.notify("frame", frame);
        content.innerHTML = `[loop.js] frame: ${frame}`;
        if (shouldRun)
          requestAnimationFrame(loop2);
      }
      this.start = () => {
        if (shouldRun)
          return;
        shouldRun = true;
        requestAnimationFrame(loop2);
      };
      this.stop = () => shouldRun = false;
      this.get = view.get;
    }
  };
  var loop = new Loop();
  var loop_default = loop;

  // src/time.js
  var Time = class {
    constructor() {
      const view = new View();
      const content = document.createElement("div");
      content.innerHTML = (/* @__PURE__ */ new Date()).toString();
      setInterval(() => {
        content.innerHTML = (/* @__PURE__ */ new Date()).toString();
      }, 1e3);
      view.set(content);
      this.get = view.get;
    }
  };
  var time = new Time();
  var time_default = time;

  // src/player.js
  var Player = class {
    constructor() {
      const view = new View();
      const content = document.createElement("div");
      content.innerHTML = "hello from player";
      view.set(content);
      this.get = view.get;
    }
  };
  var player = new Player();
  var player_default = player;

  // src/logger.js
  var Logger = class {
    constructor() {
      const view = new View();
      const root = document.createElement("div");
      const head = document.createElement("div");
      const body = document.createElement("div");
      const logs = [];
      setUI();
      function setUI() {
        head.innerHTML = "logger head";
        const toggleButton = document.createElement("button");
        toggleButton.onclick = () => {
          body.style.display = body.style.display === "none" ? "block" : "none";
        };
        toggleButton.innerText = "toggle logger visibility";
        head.append(toggleButton);
        body.innerHTML = "logger body";
        root.style.border = "1px solid";
        root.style.maxHeight = "200px";
        root.style.overflowY = "auto";
        root.append(head);
        root.append(body);
        view.set(root);
      }
      this.log = (message) => {
        logs.push(message);
        this.render();
      };
      this.render = () => {
        body.innerHTML = "";
        for (let index = logs.length - 1; index >= 0; index--) {
          const log = logs[index];
          body.innerHTML += log + "<br>";
        }
      };
      this.get = view.get;
    }
  };
  var logger = new Logger();
  var logger_default = logger;

  // src/window.js
  var WindowEventProxy = class {
    view = new View();
    eventListener = {};
    constructor() {
      const dom = this.view.get();
      dom.style.border = "1px solid";
      dom.style.padding = "1rem";
    }
    addEventListener(eventKey, key, func) {
      if (!this.eventListener[eventKey])
        this.eventListener[eventKey] = {};
      this.eventListener[eventKey][key] = func;
      window.addEventListener(eventKey, func);
      this.update();
    }
    removeEventListener(eventKey, key) {
      window.removeEventListener(eventKey, this.eventListener[eventKey][key]);
      delete this.eventListener[eventKey][key];
      this.update();
    }
    update() {
      const listeners = [];
      Object.keys(this.eventListener).forEach((eventKey) => {
        Object.keys(this.eventListener[eventKey]).forEach((key) => {
          listeners.push(eventKey + "/" + key);
        });
      });
      const contentRoot = document.createElement("pre");
      const content = document.createElement("code");
      contentRoot.append(content);
      content.innerHTML = JSON.stringify(listeners, [" "], 2);
      this.view.set(contentRoot);
    }
    get() {
      return this.view.get();
    }
  };
  var windowEventProxy = new WindowEventProxy();
  var window_default = windowEventProxy;

  // src/keyboard.js
  var keyboard = {
    on: (event, callback) => {
      window_default.addEventListener(event, "keyboard", callback);
    },
    addNamedListener: (event, name, callback) => {
      window_default.addEventListener(event, `keyboard_${name}`, callback);
    },
    removeNamedListener: (event, name) => {
      window_default.removeEventListener(event, `keyboard_${name}`);
    }
  };
  var keyboard_default = keyboard;

  // src/classes/Destroyable.js
  var Destroyable = class {
    constructor(DOM) {
      this.destroy = () => DOM.remove();
    }
  };

  // src/classes/Renderable.js
  var TARGET = document.body;
  var Renderable = class {
    constructor(DOM) {
      this.render = () => TARGET.append(DOM);
    }
  };

  // src/factories/createMessage.js
  var ELEMENT = "p";
  function createMessage(message) {
    const dom = document.createElement(ELEMENT);
    dom.innerHTML = message;
    return Object.assign({}, new Destroyable(dom), new Renderable(dom));
  }

  // src/sendMessageToPlayer.js
  var NAME = "sendMessageToPlayer";
  function sendMessageToPlayer(message, dismisser, callback) {
    const _message = createMessage(message);
    _message.render();
    keyboard_default.addNamedListener("keypress", NAME, (e) => {
      if (e.key !== dismisser)
        return;
      _message.destroy();
      keyboard_default.removeNamedListener("keypress", NAME);
      callback();
    });
  }

  // src/game.js
  var Game = class {
    constructor() {
      let isStarted = false;
      const view = new View();
      sendMessageToPlayer('press "f" to start the machine', "f", () => this.start());
      this.start = () => {
        sendMessageToPlayer('Welcome!<br>press "l" to start the logger', "l", () => {
          view.append(logger_default.get());
          const content = document.createElement("div");
          const frameDisplay = document.createElement("div");
          content.append(frameDisplay);
          view.append(content);
          keyboard_default.on("keypress", (e) => {
            if (e.key === "a")
              loop_default.start();
            if (e.key === "s")
              loop_default.stop();
            if (e.key === "t")
              content.append(time_default.get());
            if (e.key === "p")
              content.append(player_default.get());
            if (e.key === "l")
              content.append(loop_default.get());
          });
          logger_default.log(`
          press one of these keys:
            <br>"a" to start loop engine, "s" to stop it.
            <br>"t" to append time
            <br>"p" to append player
            <br>"l" to append loop
        `);
          loop_default.observe("frame", (frame) => {
            frameDisplay.innerText = `[game.js] frame: ${frame}`;
          });
        });
        isStarted = true;
      };
      this.get = view.get;
    }
  };
  var game = new Game();
  var game_default = game;

  // src/main.js
  document.body.append(game_default.get());
})();
//# sourceMappingURL=dist.js.map
