import { FastifyRequest } from 'fastify'
import { ITransaction } from '../model/transaction'
import { broadcastData, getBlockdata, getBlockchains, toHtml } from '../services/nodeblockchain.service'
import { httpResponse, IPayloadUser, IResponseBlockchain, ITransactionBlock } from '../types'
import { redis } from '../server'
import jwt from 'jsonwebtoken'
import QRcode from 'qrcode'

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

export const getSpecificData = async (req: FastifyRequest<{Params: {hashblock: string}}>, res: any) => {
  const { hashblock } = req.params
  const token: string = req.headers.authorization as string
  const payloadUser = jwt.verify(token, 'barchive') as IPayloadUser
  try {
    const data = await getBlockdata(payloadUser._id, hashblock)
    return httpResponse(200, 'Successfull get blockdata', data[0])
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}

export const createQRToken = async (req: FastifyRequest<{Params: {hashblock: string}}>, res: any) => {
  const { hashblock } = req.params
  const token: string = req.headers.authorization as string
  const payloadUser = jwt.verify(token, 'barchive') as IPayloadUser
  try {
    const blockdata = await getBlockdata(payloadUser._id, hashblock)
    const data = new Promise((resolve, reject) => {
      blockdata.forEach(data => {
        if (data) {
          resolve(data)
        }
      })
      reject(new Error('ER_NOT_FOUND'))
    })
    const result: any = await data
    await redis.set(hashblock, JSON.stringify(result.metadata))
    console.log(await redis.get(hashblock))
    return httpResponse(200, 'Successfull generate token')
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'ER_NOT_FOUND') throw httpResponse(404, 'Invalid hashblock')
      throw httpResponse(500, error.message)
    }
  }
}

export const openQRToken = async (req: FastifyRequest<{Params: {hashblock: string}}>, res: any) => {
  const { hashblock } = req.params
  try {
    const data = await redis.get(hashblock)
    if (data) {
      const dataurl = await QRcode.toDataURL(data)
      res.sent = true
      res.raw.writeHead(200, { 'Content-Type': 'text/html' })
      res.raw.end(toHtml(dataurl))
      return Promise.resolve('success')
    }
    return httpResponse(404, 'Wrong hashblock')
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}
