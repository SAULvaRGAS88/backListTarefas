const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/ConexaoDb');

// Middlewares
app.use(express.json());

// Rotas
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()', null);
    res.send(`Data/hora atual do banco: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});