import { model, Schema, Types } from 'mongoose'

export interface IUser {
    _id: Types.ObjectId
    fullname: string
    gender: string
    email: string
    password: string
}

const UserSchema = new Schema<IUser>({
  _id: { required: true, type: 'ObjectID' },
  fullname: { required: true, type: 'String' },
  gender: { required: true, type: 'String' },
  email: { required: true, type: 'String' },
  password: { required: true, type: 'String' }
})

export const User = model<IUser>('user', UserSchema)
