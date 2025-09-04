const express = require('express');
const app = express();
const db = require('./db/ConexaoDb');
const cors = require("cors");

// Middlewares
app.use(cors({ origin: "*" }));

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

//Rota usuarios
const rotaUsuario = require('./rotas/rotasUsuario/RotaUsuario.js');
app.use('/usuarios', rotaUsuario);

//Rota tarefas
const rotaTarefa = require('./rotas/rotasTarefas/RotaTarefa.js');
app.use('/tarefas', rotaTarefa);

// const port = 3000;
// // Iniciar servidor
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });


// ✅ EXPORT PARA VERCEL (OBRIGATÓRIO)
module.exports = app;