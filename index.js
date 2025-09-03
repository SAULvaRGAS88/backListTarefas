const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/ConexaoDb');

// Middlewares
app.use(express.json());

// Rota principal / API LISTA TAREFAS - NODE.JS
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()', null);
    res.send(`
      API LISTA TAREFAS - NODE.JS

      SUCESSO! A API ESTÁ RODANDO CORRETAMENTE!
    
      Data/hora atual do banco: ${result.rows[0].now.toLocaleString()}
    
    `);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Demais rotas serão adicionadas aqui

//Rota usuarios
const rotaUsuario = require('./rotas/rotasUsuario/RotaUsuario.js');
app.use('/usuarios', rotaUsuario);

//Rota tarefas
const rotaTarefa = require('./rotas/rotasTarefas/RotaTarefa.js');
app.use('/tarefas', rotaTarefa);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});