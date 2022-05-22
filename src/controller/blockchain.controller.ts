import { FastifyRequest } from 'fastify'
import { ITransaction } from '../model/transaction'
import { broadcastData, getBlockdata } from '../services/nodeblockchain.service'
import { httpResponse, IPayloadUser } from '../types'
import jwt from 'jsonwebtoken'

export const uploadImage = async (req: any, res: any) => {
  return httpResponse(200, 'Success', { imageName: req.file.filename })
}

export const insertData = async (req: FastifyRequest<{Body: ITransaction}>, res: any) => {
  const token = req.headers.authorization as string
  const data: ITransaction = req.body
  const decodeToken = jwt.verify(token, 'barchive') as IPayloadUser
  await broadcastData(decodeToken._id, data)
  return httpResponse(200, 'Data has been stored', data)
}
