import { FastifyInstance } from 'fastify'
import { upload } from '../server'
import * as blockchainController from '../controller/blockchain.controller'

export default async (fastify: FastifyInstance, opts: any) => {
  fastify.route({
    method: 'POST',
    url: '/image',
    preHandler: upload.single('image'),
    handler: blockchainController.uploadImage
  })
}
