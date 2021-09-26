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
    compilerTag: CompilerTag,
    options: any
  ): ID {
    const page = this._retriveTargetPage(pageIndex)
    return page.initSection(compilerTag, options)
  }

  public removeSection(pageIndex: number, sectionId: ID): boolean {
    const page = this._retriveTargetPage(pageIndex)
    return page.removeSection(sectionId)
  }

  public patchSection(
    pageIndex: number,
    sectionId: ID,
    key: string,
    value: string
  ): boolean {
    const page = this._retriveTargetPage(pageIndex)
    return page.patchSection(sectionId, key, value)
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
  private _hasStyles: boolean = false
  constructor(public id: ID, public value: string, public styles: IStyle) {
    this._hasStyles = Boolean(Object.keys(styles).length)
  }

  get hasStyle(): boolean {
    return this._hasStyles
  }
}
export class TreeText extends TreeElement {
  constructor(id: ID, value: string, public tag: Tag, styles: ITextStyle) {
    super(id, value, styles)
  }
}

interface IStyle {
  [key: string]: string
}
interface ITextStyle extends IStyle {}

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
type CompilerTag = 'Text' | 'View'

interface initSectionOptions {
  tag: Tag
  styles?: IStyle
}
class TreePage {
  elements: TreeElement[] = []

  constructor(public index: number) {}

  /**
   * Init
   */
  public initSection(
    compilerTag: CompilerTag,
    { tag, styles }: initSectionOptions
  ): ID {
    const defaultStyle: IStyle = {
      color: 'black',
    }
    styles = Object.assign(defaultStyle, styles)

    const id = new ID()

    switch (compilerTag) {
      case 'Text':
        return this._initTextSection(id, tag, styles)
      default:
        throw new Error(`compilerTag ${compilerTag} not yet implemented`)
    }
  }

  private _initTextSection(id: ID, tag: Tag, styles: ITextStyle): ID {
    const section = new TreeText(id, '', tag, styles)
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

  public patchSection(sectionId: ID, key: string, value: string): boolean {
    const target = this._retrieveSection(sectionId)

    if (target == null) return false

    target.styles[key] = value

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
