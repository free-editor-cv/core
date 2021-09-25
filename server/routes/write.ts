import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { SuccessReply } from '../utils/Reply'
import buildNodeMap from '../render'
import createPDFWriter from '../render/PDFWriter'

const PATH = '/write'

export default function register(server: FastifyInstance): void {
  registerPost(server)
}

const Template = Type.Object({
  filename: Type.String(),
  template: Type.String(),
})
type TemplateType = Static<typeof Template>

function registerPost(server: FastifyInstance): void {
  server.post<{ Body: TemplateType }>(
    PATH,
    postOptions,
    async (request, reply) => {
      const { template, filename } = request.body

      const validatedTemplate = template.replace(/\\/g, '')

      const nodeMap = buildNodeMap(validatedTemplate)

      const formattedFilename = createPDFWriter({ filename, nodeMap }).write()

      const successReply = SuccessReply.Created({
        message: 'Template successfully processed',
        data: {
          template,
          fileReference: formattedFilename,
        },
      })

      reply.status(201).send(successReply)
    }
  )
}

const postOptions = {
  preValidation(
    request: FastifyRequest,
    _: FastifyReply,
    done: HookHandlerDoneFunction
  ) {
    const { template } = request.body as TemplateType

    console.log(template)

    const templateType = typeof template

    if (templateType !== 'string')
      done(
        new Error(
          `template should be of type string, instead received template of type ${templateType}`
        )
      )

    if (template.length === 0) done(new Error(`template is empty`))

    done()
  },
}

/**
 *  <View>
        <View :styles="{ color: 'red' }">
            <Text v-for="color in colors" :styles="{ color }">
            {{ color }}
            </Text>
            <Text>Inherited Red</Text>
        </View>
        <Text>Default</Text>
        <Text :styles="{ color: 'yellow' }">Yellow</Text>
    </View>
 */
