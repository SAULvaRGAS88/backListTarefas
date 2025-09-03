//Rota tarefas
const express = require('express');
const router = express.Router();
const {
    retornarTodasTarefas,
    retornarTarefaEspecifica,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
} = require('../../controller/controllerTarefa/ControllerTarefa');

//Rota deretorno de todos os tarefas
router.get('/', (req, res) => {
    retornarTodasTarefas(req, res);
});

//Rota de retorno de um tarefa especifico
router.get('/:id', (req, res) => {
    retornarTarefaEspecifica(req, res);
});

//Rota de criação de um tarefa
router.post('/', (req, res) => {
    criarTarefa(req, res);
});

//Rota de atualização de um tarefa
router.put('/:id', (req, res) => {
    atualizarTarefa(req, res);
});

//Rota de deletar um tarefa
router.delete('/:id', (req, res) => {
    deletarTarefa(req, res);
});

module.exports = router;