import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { CheckUserExists } from './CheckUserExists'

interface Request {
  chat: boolean;
  username: string;
}

const checkUserExists = new CheckUserExists()

class CreateSettingService {
  async create({ chat, username }: Request) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const checkUserAlreadyExists = await checkUserExists.findByUsername(username)
    console.log(checkUserAlreadyExists)

    if (checkUserAlreadyExists) {
      throw new Error('User already exists')
    }

    const settings = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(settings);
    return settings
  }
}

export { CreateSettingService }