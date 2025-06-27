import { isLeft } from '@/shared/either'
import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { exportShortLinksToCsv } from '@/infra/storage/export-links-to-csv'

export const exportShortLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/short-links/export',
    {
      schema: {
        summary: 'Exportar links encurtados em CSV',
        tags: ['short-links'],
        response: {
          200: z.object({
            url: z.string().url(),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await exportShortLinksToCsv()

      if (isLeft(result)) {
        return reply.status(404).send({ error: result.left })
      }

      return reply.status(200).send({ url: result.right.url })
    }
  )
}
