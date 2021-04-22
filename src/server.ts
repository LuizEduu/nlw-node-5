import { httpServer } from './http';
import './websocket/client';

httpServer.listen(3000, () => console.log('Server is running'));
