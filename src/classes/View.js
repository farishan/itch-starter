export class View {
  constructor() {
    const root = document.createElement('div')

    this.get = () => root
    this.set = (node) => {
      this.clear()
      this.append(node)
    }
    this.clear = () => root.innerHTML = ''
    this.append = (node) => root.append(node)
  }
}
