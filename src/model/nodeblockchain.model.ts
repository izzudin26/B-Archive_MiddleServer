import { model, Schema, Types } from 'mongoose'

export interface INodeBlockserver {
    _id: Types.ObjectId
    uri: string
}

const NodeBlockserverSchema = new Schema<INodeBlockserver>({
  _id: { type: 'ObjectID', required: true },
  uri: { type: 'String', required: true }
})

export const NodeBlockserver = model<INodeBlockserver>('node-server', NodeBlockserverSchema)
