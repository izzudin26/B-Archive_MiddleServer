import { IUser } from '../model/user.model'
import { FastifyRequest } from 'fastify'
import { ITransaction } from '../model/transaction'

interface IResponse {
    status: number;
    message: string;
    data?: any;
}

export type requestUserBody = FastifyRequest<{Body: IUser}>

export interface IAuth {
  authorization: string
}

export interface ILogin {
  email: string,
  password: string
}

export interface IPayloadUser {
  fullname: string
  gender: string
  _id: string
}

export const httpResponse = (status: Readonly<number>, message: Readonly<string>, data?: Readonly<any>): IResponse => {
  return {
    status,
    message,
    data
  }
}

export interface ITransactionBlock {
  metadata: ITransaction;
  timestamp: number
  iteration: number
  hash ?: string
  prevHash?: string
  _id ?: string
}

export interface IResponseBlockchain {
  _id: string
  userid: string
  transactionsBlock: ITransactionBlock[]
}

export interface IPayloadQR {
  metdata: string
  hash: string
}
