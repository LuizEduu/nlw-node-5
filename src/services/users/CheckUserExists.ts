import { getCustomRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';

class CheckUserExistsService {
  async findByEmail(email: string): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({
      email,
    });

    return userExists;
  }

  async findByUserId(id: string): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({
      id,
    });

    return userExists;
  }
}

export { CheckUserExistsService };
