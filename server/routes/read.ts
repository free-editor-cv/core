import fs from 'fs'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export default function register(server: FastifyInstance): void {
  server.route({
    method: 'GET',
    url: '/read',
    schema: {
      querystring: {
        name: {
          type: 'string',
        },
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { filename } = request.query as { filename: string }

      const stream = fs.createReadStream('./tmp/' + filename)

      reply.status(200).type('application/pdf').send(stream)
    },
  })
}
