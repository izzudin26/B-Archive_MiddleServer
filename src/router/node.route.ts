import { FastifyInstance } from 'fastify'
import * as nodeController from '../controller/node.controller'

export default async (fastify: FastifyInstance, opts: any) => {
  fastify.post('/add', nodeController.registrationNode)
}
