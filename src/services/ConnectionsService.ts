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

  async findWithoutAdmin() {
    const connections = await this.connectionRepo.find({
      where: { adminId: null },
      relations: ['user'] // Entity Name, not Table name
    })

    return connections
  }

  async findBySocketId(socketId: string) {
    return await this.connectionRepo.findOne({ socketId })
  }

  async updateAdminId(userId: string, adminId: string) {
    const settings = await this.connectionRepo
      .createQueryBuilder()
      .update(Connection)
      .set({ adminId })
      .where('userId = :userId', { userId })
      .execute()
  }
}

export { ConnectionsService }