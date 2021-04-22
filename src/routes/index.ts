import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';
import { UsersController } from '../controllers/UsersController';
import { MessagesController } from '../controllers/MessagesController';

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.get('/settings', settingsController.show);
routes.get('/settings/:username', settingsController.findByUsername);
routes.post('/settings', settingsController.create);
routes.put('/settings/:username', settingsController.update);

routes.get('/users', usersController.show);
routes.post('/users', usersController.create);

routes.get('/messages/:id', messagesController.show);
routes.post('/messages', messagesController.create);

export { routes };
