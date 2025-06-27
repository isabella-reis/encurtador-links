import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { isLeft } from '@/shared/either'
import { deleteShortLinkById } from '@/app/services/delete-shortLink'

export const deleteShortLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete('/short-links/:id', {
    schema: {
      summary: 'Delete short link by ID',
      tags: ['short-links'],
      params: z.object({
        id: z.string(),
      }),
      response: {
        204: z.void(),
        404: z.object({
          error: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { id } = request.params
    const result = await deleteShortLinkById(id)

    if (isLeft(result)) {
      return reply.status(404).send({ error: result.left })
    }

    return reply.status(204).send()
  })
}
