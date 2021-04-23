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

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });

    return connections;
  }

  async findBySocketId(socket_id: string) {
    const connection = await this.connectionsRepository.findOne({
      socket_id,
    });

    return connection as Connection;
  }
}

export { FindConnectionService };
