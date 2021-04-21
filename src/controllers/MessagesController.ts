import { Request, Response } from "express";
import { CreateMessageService } from "../services/messages/CreateMessageService";
import { ListMessagesService } from "../services/messages/ListMessagesService";

class MessagesController {
  async create(req: Request, res: Response) {
    const createMessageService = new CreateMessageService()
    try {
      const { admin_id, user_id, text } = req.body

      const message = await createMessageService.create({ admin_id, user_id, text })

      return res.json(message)

    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ error: "User not found!" })
      }

      const listMessagesService = new ListMessagesService()
      return res.json(await listMessagesService.listMessagesByUser(id))

    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }
}

export { MessagesController }