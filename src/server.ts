import Fastify, { FastifyInstance } from 'fastify'

export const server: FastifyInstance = Fastify({ logger: true })

server.register(import('./router/user.route'), { prefix: '/user' })
server.register(import('./router/node.route'), { prefix: '/node' })
