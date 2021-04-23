import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

class UpdateConnectionService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async update(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}

export { UpdateConnectionService };
