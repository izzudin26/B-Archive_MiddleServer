import { server, redis } from './server'
import { connect } from 'mongoose'

const main = async () => {
  try {
    const port = process.env.POST || 5000
    const dbHost = process.env.DB_HOST || 'localhost'
    const dbPort = process.env.DB_PORT || '27017'
    await connect(`mongodb://${dbHost}:${dbPort}`)
    await redis.connect()
    server.listen(port, '0.0.0.0', () => server.log.info(`Running on 0.0.0.0:${port}`))
  } catch (error) {
    server.log.error(error)
  }
}

main()
