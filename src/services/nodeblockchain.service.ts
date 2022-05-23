import { INodeBlockserver, NodeBlockserver } from '../model/nodeblockchain.model'
import axios, { AxiosResponse } from 'axios'
import { Types } from 'mongoose'
import * as userService from './user.service'
import { ITransaction } from '../model/transaction'
import { IResponseBlockchain } from '../types'

export const getNodes = async (): Promise<INodeBlockserver[]> => {
  return await NodeBlockserver.find().exec()
}

export const registerNode = async (uri: Readonly<string>) => {
  const parseUri = uri.substring(0, 4) !== 'http' ? `http://${uri}` : uri
  const nodes: INodeBlockserver[] = await getNodes()
  nodes.forEach(async (node: INodeBlockserver) => {
    await axios.post(`${node.uri}/node`, { uri: parseUri })
    await axios.post(`${parseUri}/node`, { uri: node.uri })
  })
  const users = await userService.getUsers()
  users.forEach(async (user) => {
    await axios.post(`${parseUri}/blockchain/registraion`, { userid: user._id })
    await axios.get(`${parseUri}/blockchain/${user._id}/synchronize`)
  })
  const newNode = new NodeBlockserver({ _id: new Types.ObjectId(), uri: parseUri })
  await newNode.save()
  return newNode
}

export const getBlockchains = async (userid: Readonly<string>) => {
  const nodes: INodeBlockserver[] = await getNodes()
  const data = Promise.all(nodes.map(async (node: INodeBlockserver) => {
    const request = await axios.get(`${node.uri}/blockchain/${userid}`)
    if (request.data.message === 'Broken Chain Data') {
      await axios.get(`${node.uri}/blockchain/${userid}/synchronize`)
      return null
    }
    return request.data.data
  }))
  return await data as IResponseBlockchain[]
}

export const broadcastData = async (user: Readonly<string>, data: Readonly<ITransaction>) => {
  const nodes: INodeBlockserver[] = await getNodes()
  const timetamp: number = Date.now()
  nodes.forEach(async (node: INodeBlockserver) => {
    await axios.post(`${node.uri}/blockchain/${user}`, { payload: data, timetamp })
  })
}

export const getBlockdata = async (user: Readonly<string>, hashblock: Readonly<string>) => {
  const nodes: INodeBlockserver[] = await getNodes()
  return await Promise.all(nodes.map(async (node: INodeBlockserver) => {
    const req: AxiosResponse = await axios.get(`${node.uri}/blockchain/${user}/${hashblock}`)
    if (req.status === 200) {
      return req.data.data
    }
    throw req.data.message
  }))
}
