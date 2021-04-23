import { io } from '../http';
import { CreateConnectionService } from '../services/connections/CreateConnectionService';
import { FindConnectionService } from '../services/connections/FindConnectionService';
import { CheckUserExistsService } from '../services/users/CheckUserExists';
import { CreateUserService } from '../services/users/CreateUserService';
import { CreateMessageService } from '../services/messages/CreateMessageService';
import { ListMessagesService } from '../services/messages/ListMessagesService';

interface Params {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const createConnectionService = new CreateConnectionService();
  const checkUserExists = new CheckUserExistsService();
  const createUserService = new CreateUserService();
  const findConnectionService = new FindConnectionService();
  const createMessageService = new CreateMessageService();
  const listMessagesService = new ListMessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as Params;
    let user_id = null;

    const userExists = await checkUserExists.findByEmail(email);

    if (!userExists) {
      const user = await createUserService.create(email);

      await createConnectionService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await findConnectionService.findByUserId(
        userExists.id
      );

      if (!connection) {
        await createConnectionService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await createConnectionService.create(connection);
      }
    }

    await createMessageService.create({
      text,
      user_id,
    });

    const allMessages = await listMessagesService.listMessagesByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await findConnectionService.findAllWithoutAdmin();
    io.emit('client_list_all_users', allUsers);
  });

  socket.on('client_sent_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await findConnectionService.findBySocketId(socket_id);

    const message = await createMessageService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
