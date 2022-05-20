import { FastifyRequest } from 'fastify'
import { broadcastData, getBlockdata } from '../services/nodeblockchain.service'
import { httpResponse } from '../types'

export const uploadImage = async (req: any, res: any) => {
  return httpResponse(200, 'Success', { imageName: req.file.filename })
}
