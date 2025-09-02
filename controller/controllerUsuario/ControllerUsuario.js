//Controller usuarios para as regras de negocio do usuario, não será a camada de acesso a dados
const express = require('express');
const { retornarTodosUsuariosDb, retornarUsuarioEspecificoDb, criarUsuarioDb, atualizarUsuarioDb, deletarUsuarioDb } = require('../../models/modelUsuario/ModelUsuario');

//Retornar todos os usuarios
const retornarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await retornarTodosUsuariosDb();

        if (usuarios.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Nenhum usuário encontrado",
                data: []
            });
        }

        const usuariosSeguros = usuarios.map(u => ({
            id: u.id,
            nome: u.nome,
            email: u.email,
            created_at: u.created_at
        }));

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Usuários carregados com sucesso",
            data: usuariosSeguros
        });

    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao buscar usuários",
            data: []
        });
    }
};

//Retornar um usuario especifico
const retornarUsuarioEspecifico = async (req, res) => {
    try {
        const usuario = await retornarUsuarioEspecificoDb(req.params.id);
        
        // Verifica se o usuário é null, undefined ou um objeto vazio
        if (!usuario || Object.keys(usuario).length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Usuário não encontrado",
                data: null
            });
        }

        // Retornar apenas dados seguros do usuário
        const usuarioSeguro = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            created_at: usuario.created_at
        };

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Usuário carregado com sucesso",
            data: usuarioSeguro
        });

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao buscar usuário",
            data: null
        });
    }
};

//Criar um usuario
const criarUsuario = async (req, res) => {
    try {
        // Validação básica dos dados de entrada
        if (!req.body.nome || !req.body.email || !req.body.senha) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Dados incompletos. Nome, email e senha são obrigatórios",
                data: null
            });
        }

        const usuario = await criarUsuarioDb(req.body);
        
        // Retornar apenas dados seguros do usuário criado
        const usuarioSeguro = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            created_at: usuario.created_at
        };

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Usuário criado com sucesso",
            data: usuarioSeguro
        });

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        
        // Verificar se é um erro de duplicação (email já existe)
        if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: "Email já cadastrado",
                data: null
            });
        }
        
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao criar usuário",
            data: null
        });
    }
};

//Atualizar um usuario
const atualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verificar se o usuário existe antes de tentar atualizar
        const usuarioExistente = await retornarUsuarioEspecificoDb(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Usuário não encontrado",
                data: null
            });
        }

        // Preparar dados para atualização
        const dados = {
            id: id,
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        };

        const usuarioAtualizado = await atualizarUsuarioDb(dados);
        
        // Retornar apenas dados seguros do usuário atualizado
        const usuarioSeguro = {
            id: usuarioAtualizado.id,
            nome: usuarioAtualizado.nome,
            email: usuarioAtualizado.email,
            created_at: usuarioAtualizado.created_at
        };

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Usuário atualizado com sucesso",
            data: usuarioSeguro
        });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        
        // Verificar se é um erro de duplicação (email já existe)
        if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: "Email já está em uso por outro usuário",
                data: null
            });
        }
        
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao atualizar usuário",
            data: null
        });
    }
};

//Deletar um usuario
const deletarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verificar se o usuário existe antes de tentar deletar
        const usuarioExistente = await retornarUsuarioEspecificoDb(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Usuário não encontrado",
                data: null
            });
        }

        await deletarUsuarioDb(id);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Usuário deletado com sucesso",
            data: null
        });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao deletar usuário",
            data: null
        });
    }
};

module.exports = {
    retornarTodosUsuarios,
    retornarUsuarioEspecifico,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};