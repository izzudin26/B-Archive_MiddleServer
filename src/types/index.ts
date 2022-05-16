import { IUser } from '../model/user.model'
import { FastifyRequest } from 'fastify'

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

export const httpResponse = (status: Readonly<number>, message: Readonly<string>, data?: Readonly<any>): IResponse => {
  return {
    status,
    message,
    data
  }
}
