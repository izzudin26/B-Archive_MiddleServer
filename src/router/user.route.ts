import { FastifyInstance } from 'fastify'
import * as userController from '../controller/user.controller'

export default async (fastify: FastifyInstance, opts: any) => {
  fastify.post('/registration', userController.registrationUser)
  fastify.post('/login', userController.loginUser)
  fastify.post('/check', userController.verifyUserToken)
}
