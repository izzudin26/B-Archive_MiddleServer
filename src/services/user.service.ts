import { IUser, User } from '../model/user.model'
import axios from 'axios'
import { Types } from 'mongoose'
import crypto from 'crypto'
import * as nodeService from './nodeblockchain.service'
import { INodeBlockserver } from '../model/nodeblockchain.model'

export const getUsers = async () => await User.find().exec()

export const register = async (user: IUser) => {
  const newUser = new User(user)
  newUser._id = new Types.ObjectId()
  await newUser.save()
  const nodes: INodeBlockserver[] = await nodeService.getNodes()
  nodes.forEach(async (node: INodeBlockserver) => {
    await axios.post(`${node.uri}/blockchain/registration`, { userid: newUser._id })
  })
  return newUser
}

export const login = async (email: Readonly<string>, password: Readonly<string>): Promise<IUser | null> => {
  const user: IUser | null = await User.findOne({ email })
  if (!user) {
    throw new Error('Email Tidak ditemukan')
  }
  const hashingPassword = hashPassword(password)
  if (user.password !== hashingPassword) {
    throw new Error('Password salah')
  }
  return user
}

const hashPassword = (password: Readonly<string>): string => {
  const hash = crypto.createHash('sha256')
  return hash.update(Uint8Array.from(Buffer.from(password))).digest('hex')
}
