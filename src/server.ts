import Fastify, { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import path from 'path'

export const server: FastifyInstance = Fastify({ logger: true })

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + '../../storage'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  }
})

export const upload = multer({ storage: diskStorage })

server.register(multer.contentParser)
server.register(import('@fastify/static'), {
  root: path.join(__dirname + '../../storage'),
  prefix: '/image/'
})
server.register(import('./router/user.route'), { prefix: '/user' })
server.register(import('./router/node.route'), { prefix: '/node' })
server.register(import('./router/blockchain.route'), { prefix: '/blockchain' })
