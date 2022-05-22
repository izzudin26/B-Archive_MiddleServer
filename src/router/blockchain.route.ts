import { FastifyInstance } from 'fastify'
import { upload } from '../server'
import * as blockchainController from '../controller/blockchain.controller'
import { jwtAuth } from '../middleware/auth'

export default async (fastify: FastifyInstance, opts: any) => {
  fastify.route({
    method: 'POST',
    url: '/image',
    preHandler: upload.single('image'),
    handler: blockchainController.uploadImage
  })

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: jwtAuth,
    handler: blockchainController.insertData
  })
}
