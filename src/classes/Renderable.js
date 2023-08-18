const TARGET = document.body

export class Renderable {
  constructor(DOM) {
    this.render = () => TARGET.append(DOM)
  }
}
