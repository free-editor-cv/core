import { CompilerTag, IStyle, ITextStyle, Tag } from './Builder'
import ID from './ID'
import { TreeElement, TreeText } from './TreeElement'

interface initSectionOptions {
  tag: Tag
  styles?: IStyle
}
export default class TreePage {
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
        return this._initTextSection({ id, tag, styles })
      default:
        throw new Error(`compilerTag ${compilerTag} not yet implemented`)
    }
  }

  private _initTextSection({
    id,
    tag,
    styles,
  }: {
    id: ID
    tag: Tag
    styles: ITextStyle
  }): ID {
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
