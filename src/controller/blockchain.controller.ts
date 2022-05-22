import { FastifyRequest } from 'fastify'
import { ITransaction } from '../model/transaction'
import { broadcastData, getBlockdata, getBlockchains } from '../services/nodeblockchain.service'
import { httpResponse, IPayloadUser, IResponseBlockchain, ITransactionBlock } from '../types'
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

export const getAlldata = async (req: FastifyRequest, res: any) => {
  try {
    const token: string = req.headers.authorization as string
    const payloadUser = jwt.verify(token, 'barchive') as IPayloadUser
    const data: IResponseBlockchain[] = await getBlockchains(payloadUser._id)
    const filterableData = new Promise<ITransactionBlock[]>((resolve, reject) => {
      data.forEach((data: IResponseBlockchain) => {
        if (data) {
          const newData = data.transactionsBlock.map(transaction => {
            const { metadata, timestamp, iteration, hash } = transaction
            return { metadata, timestamp, iteration, hash }
          })
          resolve(newData)
        }
      })
    })
    return httpResponse(200, 'Successfull get data', await filterableData)
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}
