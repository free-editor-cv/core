import { reactive } from 'vue'

export default class Visualizer {
  static init() {
    return reactive(new this())
  }

  public tree: Tree

  constructor() {
    this.tree = new Tree()
    this.tree.addPage()
  }

  /**
   * getters
   */
  get pages(): TreePage[] {
    return this.tree.pages
  }

  /**
   * setters
   */
  public addPage() {
    return this.tree.addPage()
  }

  public initSection(
    pageIndex: number,
    type: 'Text' | 'View',
    options: any
  ): ID {
    const page = this._retriveTargetPage(pageIndex)
    return page.initSection(type, options)
  }

  public removeSection(pageIndex: number, sectionId: ID): boolean {
    const page = this._retriveTargetPage(pageIndex)
    return page.removeSection(sectionId)
  }

  public editSection(
    pageIndex: number,
    sectionId: ID,
    newValue: string
  ): boolean {
    const page = this._retriveTargetPage(pageIndex)
    page.editSection(sectionId, newValue)

    return true
  }

  public _retriveTargetPage(pageIndex: number): TreePage {
    return this.tree.pages[pageIndex]
  }
}

export class Tree {
  public pages: TreePage[] = []

  addPage() {
    const newPage = new TreePage(this.pages.length)
    this.pages.push(newPage)
    return this.pages.length - 1
  }
}

export abstract class TreeElement {
  constructor(public id: ID, public value: string) {}
}
export class TreeText extends TreeElement {
  constructor(id: ID, value: string, public tag: Headings) {
    super(id, value)
  }
}

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Paragraphs = 'span' | 'p'
type Tag = Headings | Paragraphs
interface initSectionOptions {
  tag?: Tag
}
class TreePage {
  elements: TreeElement[] = []

  constructor(public index: number) {}

  /**
   * Init
   */
  public initSection(type: 'Text' | 'View', options: initSectionOptions): ID {
    options = Object.assign({ tag: 'h1' }, options)

    const id = new ID()
    switch (type) {
      case 'Text':
        return this._initTextSection(id, (options.tag as Headings) || 'h1') // FIXME find the correct guard
      default:
        throw new Error(`type ${type} not yet implemented`)
    }
  }

  private _initTextSection(id: ID, tag: Headings): ID {
    const section = new TreeText(id, '', tag)
    this.elements.push(section)
    return id
  }

  /**
   * Edit
   */
  public editSection(sectionId: ID, newValue: string): boolean {
    const target = this._retrieveSection(sectionId)

    if (target == null) return false

    target.value = newValue

    return true
  }

  /**
   *
   * Remove
   */
  public removeSection(sectionId: ID): boolean {
    const targetIndex = this._retrieveSectionIndex(sectionId)

    if (targetIndex === -1) return false

    this.elements.splice(targetIndex, 1)

    return true
  }

  /**
   * Utils
   */
  private _retrieveSection(sectionId: ID): TreeElement | null {
    return this.elements.find(el => el.id.isEqual(sectionId)) || null
  }

  private _retrieveSectionIndex(sectionId: ID): number {
    return this.elements.findIndex(el => el.id.isEqual(sectionId))
  }
}
class ID {
  value = (Math.random() * 1000).toFixed(0)

  public isEqual(input: ID): boolean {
    return this.value === input.value
  }
}
