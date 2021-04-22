import { Request, Response } from 'express';
import { CreateSettingService } from '../services/settings/CreateSettingService';
import { ListSettingsService } from '../services/settings/ListSettingsService';
import { UpdateSettingsService } from '../services/settings/UpdateSettingsService';

const createSettingService = new CreateSettingService();
const listSettingsService = new ListSettingsService();
const updateSettingsService = new UpdateSettingsService();
class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body;

      const setting = await createSettingService.create({ chat, username });

      return res.json(setting);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  async show(req: Request, res: Response) {
    return res.json(await listSettingsService.show());
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const settings = await listSettingsService.findByUsername(username);

    return res.json(settings);
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;

    await updateSettingsService.update({ username, chat });

    return res.status(201).json();
  }
}

export { SettingsController };
