import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import './database';
import { routes } from './routes';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public'))); //arquivos publicos

app.set('views', path.join(__dirname, '..', 'public')); // setando o caminho das views

app.engine('html', require('ejs').renderFile); //Setando a view engine para renderizar html

app.set('view engine', 'html'); //setando a view engine como para HTML

app.get('/', (req, res) => {
  return res.render('html/client.html');
});

app.get('/admin', (req, res) => {
  return res.render('html/admin.html');
});

const httpServer = createServer(app); //criando o protocolo HTTP
const io = new Server(httpServer); //criando o protocolo WebSocket para rodar na mesma porta do servidor HTTP

io.on('connection', (socket: Socket) => {
  console.log(`Conection ON! ${socket.id}`);
});

app.use(express.json());
app.use(routes);

export { httpServer, io };
