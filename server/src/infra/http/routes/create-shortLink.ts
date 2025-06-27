import { z } from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uuidv7 } from 'uuidv7'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { eq } from 'drizzle-orm'

export const createShortLinkRoute: FastifyPluginAsyncZod = async server => {
	server.post(
		'/short-links',
		{
			schema: {
				summary: 'Create short link',
				tags: ['short-links'],
				body: z.object({
					originalUrl: z.string().url(),
					customCode: z.string().min(3).max(20),
				}),
				response: {
					201: z.object({
						id: z.string(),
						shortCode: z.string(),
						originalUrl: z.string().url(),
					}),
					200: z.object({
						shortCode: z.string(),
						message: z.string(),
					}),
					409: z.object({
						error: z.string(),
					}),
					400: z.object({
						error: z.string(),
						details: z.any(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, customCode } = request.body

			// Verifica se a URL já foi encurtada
			const existing = await db
				.select()
				.from(schema.shortLinks)
				.where(eq(schema.shortLinks.originalUrl, originalUrl))

			if (existing.length > 0 && !customCode) {
				return reply.status(200).send({
					shortCode: existing[0].shortCode,
					message: 'Link already exists, returning existing shortCode',
				})
			}

			// Se o customCode foi enviado, verifica se já está em uso
			if (customCode) {
				const conflict = await db
					.select()
					.from(schema.shortLinks)
					.where(eq(schema.shortLinks.shortCode, customCode))

				if (conflict.length > 0) {
					return reply.status(409).send({
						error: 'Custom short code already in use.',
					})
				}
			}

			// Geração de código único (8 caracteres do UUIDv7)
			async function generateUniqueCode(): Promise<string> {
				let code: string
				let exists: boolean

				do {
					code = uuidv7().slice(0, 8)
					const result = await db
						.select()
						.from(schema.shortLinks)
						.where(eq(schema.shortLinks.originalUrl, originalUrl))

					exists = result.length > 0
				} while (exists)

				return code
			}

			const shortCode = customCode ?? (await generateUniqueCode())

			const newLink = await db
				.insert(schema.shortLinks)
				.values({
					originalUrl,
					shortCode,
				})
				.returning({
					id: schema.shortLinks.id,
					shortCode: schema.shortLinks.shortCode,
				})

			return reply.status(201).send({
				id: newLink[0].id,
				shortCode: newLink[0].shortCode,
				originalUrl,
			})
		}
	)
}
