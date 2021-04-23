import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { ConnectionRepository } from '../repositories/ConnectionsRepository'

interface IConnectionCreate {
  socketId: string
  userId: string
  adminId?: string
  id?: string
}

class ConnectionsService {

  private connectionRepo: Repository<Connection>

  constructor() {
    this.connectionRepo = getCustomRepository(ConnectionRepository)
  }

  async create({ socketId, userId, adminId, id }: IConnectionCreate) {
    const connection = this.connectionRepo.create({
      socketId, userId, adminId, id
    })

    await this.connectionRepo.save(connection)

    return connection
  }

  async findByUserId(userId: string) {
    const connection = await this.connectionRepo.findOne({ userId })
    return connection
  }
}

export { ConnectionsService }