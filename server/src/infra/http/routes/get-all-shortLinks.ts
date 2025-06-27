import { getAllShortLinks } from '@/app/services/get-all-shortLinks'
import { isRight } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const listAllShortLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get('/short-links', {
    schema: {
      summary: 'List all short links',
      tags: ['short-links'],
      response: {
        200: z.array(
          z.object({
            id: z.string(),
            shortCode: z.string(),
            originalUrl: z.string().url(),
            hits: z.number(),
            createdAt: z.date(),
          })
        ),
        500: z.object({
          error: z.string(),
        }),
      },
    },
  }, async (_request, reply) => {
    const result = await getAllShortLinks()

    if (isRight(result)) {
      return reply.status(200).send(result.right)
    }

    return reply.status(500).send({ error: 'Erro ao buscar os links.' })
  })
}
