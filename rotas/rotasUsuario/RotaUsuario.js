//Rota usuarios
const express = require('express');
const router = express.Router();
const {
    retornarTodosUsuarios,
    retornarUsuarioEspecifico,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
} = require('../../controller/controllerUsuario/ControllerUsuario');

//Rota deretorno de todos os usuarios
router.get('/', (req, res) => {
    retornarTodosUsuarios(req, res);
});

//Rota de retorno de um usuario especifico
router.get('/:id', (req, res) => {
    retornarUsuarioEspecifico(req, res);
});

//Rota de criação de um usuario
router.post('/', (req, res) => {
    criarUsuario(req, res);
});

//Rota de atualização de um usuario
router.put('/:id', (req, res) => {
    atualizarUsuario(req, res);
});

//Rota de deletar um usuario
router.delete('/:id', (req, res) => {
    deletarUsuario(req, res);
});

module.exports = router;