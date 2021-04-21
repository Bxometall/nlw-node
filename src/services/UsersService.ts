import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {

  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(email: string) {
    // verify if user already exists
    const userExists = await this.usersRepository.findOne({ email })

    // if exists, return user from db
    if (userExists) {
      return userExists
    }

    // if not, create on db
    const user = this.usersRepository.create({ email }) // to create the entity (new User(email, username...))

    await this.usersRepository.save(user)

    return user
  }
}

export { UsersService }