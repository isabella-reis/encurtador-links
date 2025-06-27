import { incrementShortLinkHit } from '@/app/services/increment-shortLink'
import { getOriginalUrlByShortCode } from '@/app/services/redirect-ShortLink'
import { isLeft } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const redirectShortLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get('/:shortCode', {
    schema: {
      summary: 'Redirect to original URL',
      tags: ['short-links'],
      params: z.object({
        shortCode: z.string(),
      }),
      response: {
        302: z.void(),
        404: z.object({
          error: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { shortCode } = request.params

    const result = await getOriginalUrlByShortCode(shortCode)

    if (isLeft(result)) {
      return reply.status(404).send({ error: result.left })
    }

    // Atualiza contagem
    await incrementShortLinkHit(shortCode)

    return reply.redirect(result.right)
  })
}
