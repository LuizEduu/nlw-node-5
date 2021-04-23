const socket = io();
let connectionsUsers = [];

socket.on('admin_list_all_users', (connections) => {
  connectionsUsers = connections;
  document.querySelector('#list_users').innerHTML = '';

  let template = document.querySelector('#template').innerHTML;

  connections.forEach((connection) => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id,
    });

    document.querySelector('#list_users').innerHTML += rendered;
  });
});

function call(id) {
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id === id
  );

  const template = document.querySelector('#admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });

  document.querySelector('#supports').innerHTML += rendered;

  const params = {
    user_id: connection.user_id,
  };

  socket.emit('admin_user_in_support', params);

  socket.emit('admin_list_messages_by_user', params, (messages) => {
    const divMessages = document.querySelector(
      `#allMessages${connection.user_id}`
    );

    messages.forEach((message) => {
      const createDiv = document.createElement('div');

      if (message.admin_id === null) {
        createDiv.className = 'admin_message_client';

        createDiv.innerHTML = `<span>${connection.user.email} </span`;
        createDiv.innerHTML += `<span> ${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date"> ${dayjs(
          message.created_at
        ).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      } else {
        createDiv.className = 'admin_message_client';

        createDiv.innerHTML = `Atendente: <span>${connection.user.email} - ${message.text} </span>`;
        createDiv.innerHTML += `<span class="admin_date"> ${dayjs(
          message.created_at
        ).format('DD/MM/YYYY HH:mm:ss')} </span>`;
      }

      divMessages.appendChild(createDiv);
    });
  });
}

function sendMessage(id) {
  const text = document.querySelector(`#send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id,
  };

  socket.emit('admin_send_message', params);

  const divMessages = document.querySelector(`#allMessages${id}`);
  const createDiv = document.createElement('div');

  createDiv.className = 'admin_message_admin';

  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date"> ${dayjs().format(
    'DD/MM/YYYY HH:mm:ss'
  )} </span>`;

  divMessages.appendChild(createDiv);

  text.value = '';
}

socket.on('admin_receive_message', (data) => {
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id == data.socket_id
  );

  const divMessages = document.querySelector(
    `#allMessages${connection.user_id}`
  );
  const createDiv = document.createElement('div');
  createDiv.className = 'admin_message_client';
  createDiv.innerHTML = `Atendente: <span>${connection.user.email} - ${data.message.text} </span>`;
  createDiv.innerHTML += `<span class="admin_date"> ${dayjs(
    data.message.created_at
  ).format('DD/MM/YYYY HH:mm:ss')} </span>`;

  divMessages.appendChild(createDiv);
});
