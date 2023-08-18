export class Destroyable {
  constructor(DOM) {
    this.destroy = () => DOM.remove()
  }
}
