import TreePage from './TreePage'

export default class Tree {
  public pages: TreePage[] = []

  addPage() {
    const newPage = new TreePage(this.pages.length)
    this.pages.push(newPage)
    return this.pages.length - 1
  }
}
