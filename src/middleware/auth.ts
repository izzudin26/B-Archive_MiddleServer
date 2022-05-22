import { FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { httpResponse } from '../types'

export const jwtAuth = async (req: FastifyRequest, res: any, next: any) => {
  const token = req.headers.authorization
  try {
    if (!token) {
      httpResponse(401, 'Token is empty')
    }
    const verify = await jwt.verify(token!, 'barchive')
    if (!verify) {
      httpResponse(403, 'Wrong token')
    }
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}
