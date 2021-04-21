import { getCustomRepository } from "typeorm";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/UsersRepository";

class ListUsersService {
  async show(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = await usersRepository.find()

    return users
  }
}

export { ListUsersService }