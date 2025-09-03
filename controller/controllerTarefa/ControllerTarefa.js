//Controller tarefas para as regras de negocio do tarefa, não será a camada de acesso a dados
const express = require('express');
const { retornarTodasTarefasDb, retornarTarefaEspecificaDb, criarTarefaDb, atualizarTarefaDb, deletarTarefaDb } = require('../../models/modelTarefa/ModelTarefa');

//Retornar todos os tarefas
const retornarTodasTarefas = async (req, res) => {
    try {
        const tarefas = await retornarTodasTarefasDb();

        if (tarefas.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Nenhuma tarefa encontrada",
                data: []
            });
        }

        const tarefasSeguras = tarefas.map(t => ({
            id: t.id,
            nome: t.nome,
            descricao: t.descricao,
            status: t.status,
            favorita: t.favorita,
            cor: t.cor,
            usuario_id: t.usuario_id
        }));

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Tarefas carregadas com sucesso",
            data: tarefasSeguras
        });

    } catch (error) {
        console.error('Erro ao buscar todas as tarefas:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao buscar tarefas",
            data: []
        });
    }
};

//Retornar um tarefa especifico
const retornarTarefaEspecifica = async (req, res) => {
    try {
        const tarefa = await retornarTarefaEspecificaDb(req.params.id);
        
        // Verifica se o usuário é null, undefined ou um objeto vazio
        if (!tarefa || Object.keys(tarefa).length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Tarefa não encontrada",
                data: null
            });
        }

        // Retornar apenas dados seguros da tarefa  
        const tarefaSegura = {
            id: tarefa.id,
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            status: tarefa.status,
            favorita: tarefa.favorita,
            cor: tarefa.cor,
            usuario_id: tarefa.usuario_id,
            created_at: tarefa.created_at
        };

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Tarefa carregada com sucesso",
            data: tarefaSegura
        });

    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao buscar tarefa",
            data: null
        });
    }
};

//Criar um tarefa
const criarTarefa = async (req, res) => {
    try {
        // Validação básica dos dados de entrada
        if (!req.body.nome || !req.body.descricao || !req.body.status || !req.body.favorita || !req.body.cor || !req.body.usuario_id) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Dados incompletos. Nome, descricao, status, favorita, cor e usuario_id são obrigatórios",
                data: null
            });
        }

        const tarefa = await criarTarefaDb(req.body);
        
        // Retornar apenas dados seguros do usuário criado
        const tarefaSegura = {
            id: tarefa.id,
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            status: tarefa.status,
            favorita: tarefa.favorita,
            cor: tarefa.cor,
            usuario_id: tarefa.usuario_id,
            created_at: tarefa.created_at
        };

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Tarefa criada com sucesso",
            data: tarefaSegura
        });

    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        
        // Verificar se é um erro de duplicação (tarefa já existe)
        if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: "Tarefa já cadastrada",
                data: null
            });
        }
        
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao criar tarefa",
            data: null
        });
    }
};

//Atualizar um tarefa
const atualizarTarefa = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verificar se o tarefa existe antes de tentar atualizar
        const tarefaExistente = await retornarTarefaEspecificaDb(id);
        if (!tarefaExistente) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Tarefa não encontrada",
                data: null
            });
        }

        // Preparar dados para atualização
        const dados = {
            id: id,
            nome: req.body.nome,
            descricao: req.body.descricao,
            status: req.body.status,
            favorita: req.body.favorita,
            cor: req.body.cor,
            usuario_id: req.body.usuario_id,
        };

        const tarefaAtualizada = await atualizarTarefaDb(dados);
        
        // Retornar apenas dados seguros do usuário atualizado
        const tarefaSegura = {
            id: tarefaAtualizada.id,
            nome: tarefaAtualizada.nome,
            descricao: tarefaAtualizada.descricao,
            status: tarefaAtualizada.status,
            favorita: tarefaAtualizada.favorita,
            cor: tarefaAtualizada.cor,
            usuario_id: tarefaAtualizada.usuario_id,
            created_at: tarefaAtualizada.created_at
        };

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Tarefa atualizada com sucesso",
            data: tarefaSegura
        });

    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        
        // Verificar se é um erro de duplicação (tarefa já existe)
        if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
            return res.status(409).json({
                statusCode: 409,
                success: false,
                message: "Tarefa já está em uso por outro usuário",
                data: null
            });
        }
        
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao atualizar tarefa",
            data: null
        });
    }
};

//Deletar um tarefa
const deletarTarefa = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verificar se o tarefa existe antes de tentar deletar
        const tarefaExistente = await retornarTarefaEspecificaDb(id);
        if (!tarefaExistente) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Tarefa não encontrada",
                data: null
            });
        }

        await deletarTarefaDb(id);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Tarefa deletada com sucesso",
            data: null
        });

    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: "Erro interno do servidor ao deletar tarefa",
            data: null
        });
    }
};

module.exports = {
    retornarTodasTarefas,
    retornarTarefaEspecifica,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
};