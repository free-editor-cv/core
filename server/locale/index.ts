import readline from 'readline'
import Config from './Config'
import createSequence, { Sequence } from './sequence'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const config = new Config()
const sequence = createSequence(config)

exec(sequence)

function exec(sequence: Sequence) {
  sequence.forEach(({ q, fn }) => {
    rl.question(q, fn)
  })
}
