import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message"
import { MessageRepository } from "../repositories/MessagesRepository"
import { UsersRepository } from "../repositories/UsersRepository"

interface IMessageCreate {
  adminId?: string // ? means that it can not be present
  text: string
  user_id: string
}

class MessagesService {

  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessageRepository)
  }

  async create({ adminId, text, user_id }: IMessageCreate) {
    const usersRepo = getCustomRepository(UsersRepository)
    
    const user = await usersRepo.findOne({ id: user_id }) // this is one way to do, on the listByUser I'm using a simpler way to find
    console.log("User searched %s", JSON.stringify(user)) // try use repo.create to see if I can send the object without finding on dabtase
    
    if (!user) {
      throw new Error("User Not Found!")
    }
    
    const message = this.messagesRepository.create({
      adminId,
      text,
      user
    })
    
    return await this.messagesRepository.save(message)
  }
  
  async listByUser(user_id: string) {
    console.log('user id param %s', user_id)
    
    // const list = await messagesRepository.find({ userId: user_id }) // like this we don't need to search on database the User again

    // bringing the relations of this entity
    const list = await this.messagesRepository.find({
      where: { userId: user_id },
      relations: ['user']
    }) 
    
    // console.log('list %s', JSON.stringify(list))

    return list
  }
}

export { MessagesService }