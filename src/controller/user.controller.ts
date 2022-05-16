import { IUser } from '../model/user.model'
import * as userService from '../services/user.service'
import { requestUserBody, httpResponse, IAuth, ILogin } from '../types'
import jwt from 'jsonwebtoken'
import { FastifyRequest } from 'fastify'

export const registrationUser = async (req: requestUserBody, res: any) => {
  const body: IUser = req.body
  try {
    const user: IUser = await userService.register(body)
    const token = jwt.sign({
      fullname: user.fullname,
      gender: user.gender,
      _id: user._id
    }, 'barchive', { expiresIn: '2d' })
    return httpResponse(200, 'successfull registration', { token })
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}

export const loginUser = async (req: FastifyRequest<{Body: ILogin}>, res: any) => {
  try {
    const { email, password } = req.body
    const user: IUser | null = await userService.login(email, password)
    if (!user) {
      throw httpResponse(404, 'invalid user')
    }
    const token = jwt.sign({
      fullname: user.fullname,
      gender: user.gender,
      _id: user._id
    }, 'barchive', { expiresIn: '2d' })
    return httpResponse(200, 'successfull login', { token })
  } catch (error) {
    if (error instanceof Error) throw httpResponse(500, error.message)
  }
}

export const verifyUserToken = async (req: FastifyRequest<{Headers: IAuth}>, res: any) => {
  try {
    const token = req.headers.authorization
    return httpResponse(200, 'token is Valid')
  } catch (error) {
    throw httpResponse(401, 'invalid token')
  }
}
