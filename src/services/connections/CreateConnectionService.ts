import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

interface Request {
  user_id: string;
  admin_id?: string;
  socket_id: string;
  id?: string;
}

class CreateConnectionService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ user_id, admin_id, socket_id, id }: Request) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
}

export { CreateConnectionService };
