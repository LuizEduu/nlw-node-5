import { httpServer } from './http';
import './websocket/client';
import './websocket/admin';

httpServer.listen(3000, () => console.log('Server is running'));
