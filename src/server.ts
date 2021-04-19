import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ ola: 'Mundo' });
});

app.post('/', (req, res) => {
  return res.json({ message: 'Usuário salvo com sucesso' });
});

app.listen(3000, () => console.log('Server is running'));
