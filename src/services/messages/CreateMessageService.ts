import { getCustomRepository } from "typeorm"
import { Message } from "../../entities/Message"
import { MessagesRepository } from "../../repositories/MessagesRepository"

interface Request {
  admin_id: string
  user_id: string
  text: string
}

class CreateMessageService {
  async create({ admin_id, user_id, text }: Request): Promise<Message> {
    const messagesRepository = getCustomRepository(MessagesRepository)

    const message = messagesRepository.create({
      admin_id,
      user_id,
      text
    })

    return await messagesRepository.save(message)
  }

}

export { CreateMessageService }