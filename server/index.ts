import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import registerWriteRoutes from './routes/write'
import registerReadRoutes from './routes/read'

const server = fastify()
server.register(fastifyCors, {
  // origin: (origin, cb) => {
  //   if (/localhost/.test(origin)) {
  //     cb(null, true)
  //     return
  //   }

  //   cb(new Error(`The origin ${origin} is not allowed`), false)
  // },
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
})

registerWriteRoutes(server)
registerReadRoutes(server)

const PORT = 8080
server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.info(`Server listening at ${address}`)
})
