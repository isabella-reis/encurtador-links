import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
	serializerCompiler,
	validatorCompiler,
	hasZodFastifySchemaValidationErrors,
} from 'fastify-type-provider-zod'

import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { transformSwaggerSchema } from './transform-swagger-schema'
import { createShortLinkRoute } from './routes/create-shortLink'
import { listAllShortLinksRoute } from './routes/get-all-shortLinks'
import { redirectShortLinkRoute } from './routes/redirect-shortLink'
import { deleteShortLinkRoute } from './routes/delete-shortLink-byId'
import { exportShortLinksRoute } from './routes/export-shortLinks'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

/**
 * Manipulador global de erros do servidor.
 *
 * @param {Error} error - O erro capturado durante a execução.
 * @param {import('fastify').FastifyRequest} request - O objeto da requisição.
 * @param {import('fastify').FastifyReply} reply - O objeto de resposta do Fastify.
 * @returns {import('fastify').FastifyReply} A resposta HTTP correspondente ao erro.
 */
server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.validation,
		})
	}

	console.log(error) // Substituiríamos por um logger que enviaria o erro para o Datadog (ex.:)

	return reply.status(500).send({ message: 'Internal server error.' })
})

// Importação dos plugins necessários
server.register(fastifyCors, {
	origin: ['http://localhost:5173', 'https://brevly-pi.vercel.app'],
	methods: ['GET', 'POST', 'DELETE'],
})
server.register(fastifyMultipart)

/**
 * Configuração da documentação da API com Swagger.
 */
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Upload Server',
			version: '1.0.0',
		},
	},
	transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

/**
 * Registro das rotas da aplicação.
 */
server.register(createShortLinkRoute)
server.register(listAllShortLinksRoute)
server.register(redirectShortLinkRoute)
server.register(deleteShortLinkRoute)
server.register(exportShortLinksRoute)

/**
 * Inicialização do servidor.
 */
server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('HTTP server running')
})
