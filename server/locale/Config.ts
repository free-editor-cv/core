import path from 'path'
import fs from 'fs'

export default class Config {
  private _filename: string = ''
  private _template: string = ''
  public outDir = path.resolve(__dirname, 'outputs') + '/'

  get filename(): string {
    return path.basename(this._filename, path.extname(this._filename))
  }

  set filename(val: string) {
    const tmp = path.resolve(__dirname, 'templates', val + '.txt')
    try {
      if (!fs.existsSync(tmp)) throw new Error()
      this._filename = tmp
      this._template = fs.readFileSync(this._filename, 'utf8')
    } catch (err) {
      console.error('It does not exists')
      // TODO ask again
    }
  }

  get template(): string {
    if (!this._template.length) throw new Error()
    return this._template
  }
}
