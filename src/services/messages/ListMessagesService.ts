import { getCustomRepository } from "typeorm"
import { Message } from "../../entities/Message"
import { MessagesRepository } from "../../repositories/MessagesRepository"
import { CheckUserExists } from "../users/CheckUserExists"

class ListMessagesService {
  async listMessagesByUser(user_id: string): Promise<Message[]> {
    const messagesRepository = getCustomRepository(MessagesRepository)
    const checkUserExistsService = new CheckUserExists()

    const user = await checkUserExistsService.findByUserId(user_id)

    if (!user) {
      throw new Error('User not exists!')
    }

    const messages = await messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    })

    return messages
  }
}

export { ListMessagesService }