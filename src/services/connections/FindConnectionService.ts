import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

class FindConnectionService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }
}

export { FindConnectionService };
