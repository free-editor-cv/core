import { IStyle, ITextStyle, Tag } from './Builder'
import ID from './ID'

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
