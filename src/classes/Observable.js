export class Observable {
  constructor() {
    const observersByKey = {}

    this.observe = (key, fn) => {
      if (!observersByKey[key]) observersByKey[key] = []
      observersByKey[key].push(fn)
    }

    this.unobserve = (key, fn) => {
      if (!observersByKey[key]) observersByKey[key] = []
      observersByKey[key] = observersByKey[key].filter(f => f !== fn)
    }

    this.getObservers = (key) => {
      return observersByKey[key] || []
    }
  }

  notify(key, message) {
    const observers = this.getObservers(key)

    for (let index = 0; index < observers.length; index++) {
      const observer = observers[index];
      observer(message)
    }
  }
}
