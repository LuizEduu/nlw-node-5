import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { Setting } from '../../entities/Setting';

interface Request {
  chat: boolean;
  username: string;
}

class UpdateSettingsService {
  async update({ chat, username }: Request) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    await settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();
  }
}

export { UpdateSettingsService };
