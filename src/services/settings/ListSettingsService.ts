import { getCustomRepository } from 'typeorm';
import { Setting } from '../../entities/Setting';
import { SettingsRepository } from '../../repositories/SettingsRepository';

class ListSettingsService {
    async show(): Promise<Setting[]> {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = await settingsRepository.find()

        return settings
    }
}

export { ListSettingsService }