import { getCustomRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';
import { CheckUserExistsService } from '../users/CheckUserExists';

const checkUserExists = new CheckUserExistsService();

class CreateUserService {
  async create(email: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await checkUserExists.findByEmail(email);

    if (userExists) {
      throw new Error('User Already Exists!');
    }

    const user = usersRepository.create({
      email,
    });

    console.log(user);

    return await usersRepository.save(user);
  }
}

export { CreateUserService };
