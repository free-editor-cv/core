import buildNodeMap from '../render'
import createPDFWriter from '../render/PDFWriter'
import Config from './Config'

type AnswerFn = (answer: string) => void
type Step = Readonly<{ q: string; fn: AnswerFn }>
export type Sequence = Readonly<Step[]>

export default function createSequence(config: Config): Sequence {
  return [
    {
      q: 'Select file to use as a template (without file ext)\n> ',
      fn(filename: string) {
        config.filename = filename

        const nodeMap = buildNodeMap(config.template)

        createPDFWriter({
          filename: config.filename,
          nodeMap,
          outputDir: config.outDir,
        }).write()
      },
    },
  ] as const
}
