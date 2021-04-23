import { io } from '../http';
import { FindConnectionService } from '../services/connections/FindConnectionService';
import { CreateMessageService } from '../services/messages/CreateMessageService';
import { ListMessagesService } from '../services/messages/ListMessagesService';
import { UpdateConnectionService } from '../services/connections/UpdateConnectionService';

io.on('connect', async (socket) => {
  const findConnectionService = new FindConnectionService();
  const listMessagesService = new ListMessagesService();
  const createMessageService = new CreateMessageService();
  const updateConnectionService = new UpdateConnectionService();

  const allCOnnectionsWithoutAdmin = await findConnectionService.findAllWithoutAdmin();

  io.emit('admin_list_all_users', allCOnnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;

    const allMessages = await listMessagesService.listMessagesByUser(user_id);

    callback(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await createMessageService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const connection = await findConnectionService.findByUserId(user_id);

    io.to(String(connection?.socket_id)).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;
    const connection = await updateConnectionService.update(user_id, socket.id);

    const allCOnnectionsWithoutAdmin = await findConnectionService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', allCOnnectionsWithoutAdmin);
  });
});
