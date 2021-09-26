import { reactive } from 'vue'
import ID from './ID'
import Tree from './Tree'
import TreePage from './TreePage'

export default class TreeBuilder {
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

export interface IStyle {
  [key: string]: string
}
export interface ITextStyle extends IStyle {}

export type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
export type CompilerTag = 'Text' | 'View'
