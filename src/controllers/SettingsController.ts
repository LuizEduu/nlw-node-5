import { Request, Response } from 'express';
import { CreateSettingService } from '../services/settings/CreateSettingService'
import { ListSettingsService } from '../services/settings/ListSettingsService';

const createSettingService = new CreateSettingService()
const listSettingsService = new ListSettingsService()
class SettingsController {
  async create(req: Request, res: Response) {

    try {
      const { chat, username } = req.body

      const setting = await createSettingService.create({ chat, username })

      return res.send(setting)
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  async show(req: Request, res: Response) {
    return res.send(await listSettingsService.show())
  }
}

export { SettingsController };
