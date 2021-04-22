import { getCustomRepository } from 'typeorm';
import { Setting } from '../../entities/Setting';
import { SettingsRepository } from '../../repositories/SettingsRepository';

class ListSettingsService {
  async show(): Promise<Setting[]> {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = await settingsRepository.find();

    return settings;
  }

  async findByUsername(username: string) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = await settingsRepository.findOne({
      username,
    });

    return settings;
  }
}

export { ListSettingsService };
