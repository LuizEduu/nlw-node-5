import { getCustomRepository } from 'typeorm'
import { Setting } from '../../entities/Setting'
import { SettingsRepository } from '../../repositories/SettingsRepository'


class CheckUserExists {
    async findByUsername(username: string): Promise<Setting | undefined> {
        const settingsRepository = getCustomRepository(SettingsRepository)
        const checkUserAlreadyExists = await settingsRepository.findOne({ username })
        console.log(checkUserAlreadyExists)

        return checkUserAlreadyExists
    }
}

export { CheckUserExists }