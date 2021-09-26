import { IStyle, ITextStyle, Tag, TreeStyleSheet } from './Builder'
import ID from './ID'

export abstract class TreeElement {
  private _hasStyles: boolean = false
  constructor(public id: ID, public value: string, public styles: ITextStyle) {
    this._hasStyles = Boolean(Object.keys(styles).length)
  }

  get hasStyle(): boolean {
    return this._hasStyles
  }
}

export class TreeText extends TreeElement {
  public tag: Tag

  constructor(
    id: ID,
    value: string,
    tag: Tag,
    styles: IStyle,
    styleSheet: TreeStyleSheet
  ) {
    const fontSize = styleSheet.fontSize[tag] + 'px'
    styles = { ...styles, fontSize }

    super(id, value, styles as ITextStyle)
    this.tag = tag
  }
}
