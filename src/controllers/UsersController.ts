import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
import { ListUsersService } from "../services/users/ListUsersService";


class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserService = new CreateUserService()
    try {
      const { email } = req.body

      const user = await createUserService.create(email)

      return res.json(user)

    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  async show(req: Request, res: Response) {
    const listUsersService = new ListUsersService()
    return res.json(await listUsersService.show())
  }
}

export { UsersController }