import { FastifyRequest } from 'fastify'
import { INodeBlockserver } from '../model/nodeblockchain.model'
import { registerNode } from '../services/nodeblockchain.service'
import { httpResponse } from '../types'

export const registrationNode = async (req: FastifyRequest<{Body: {uri: string}}>, res: any) => {
  try {
    const { uri } = req.body
    const node: INodeBlockserver = await registerNode(uri)
    return httpResponse(200, 'Node registration', node)
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}
