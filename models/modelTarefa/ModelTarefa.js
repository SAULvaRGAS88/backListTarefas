const db = require('../../db/ConexaoDb');

//Retornar todas as tarefas
/**Busca todas as pessoas no banco */
const retornarTodasTarefasDb = async () => {
    try {
        const result = await db.query('SELECT * FROM tarefa');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar tarefas no banco de dados:', error);
        throw new Error('Falha ao acessar todas as tarefas no banco de dados');
    }
}

//Retornar uma tarefa especifica
const retornarTarefaEspecificaDb = async (id) => {
    try {
        const result = await db.query('SELECT * FROM tarefa WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar tarefa no banco de dados:', error);
        throw new Error('Falha ao acessar tarefa no banco de dados');
    }
}

//Criar um usuario
const criarTarefaDb = async (tarefa) => {
    try {
        const result = await db.query('INSERT INTO tarefa (nome, descricao, status, favorita, cor, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)', [tarefa.nome, tarefa.descricao, tarefa.status, tarefa.favorita, tarefa.cor, tarefa.usuario_id]);
        return result.rows;
    }
    catch (error) {
        console.error('Erro ao criar tarefa no banco de dados:', error);
        throw new Error('Falha ao criar tarefa no banco de dados');
    }
}

//Atualizar uma tarefa
const atualizarTarefaDb = async (tarefa) => {
    try {
        const result = await db.query(
            'UPDATE tarefa SET nome = $1, descricao = $2, status = $3, favorita = $4, cor = $5, usuario_id = $6 WHERE id = $7 RETURNING *',
            [tarefa.nome, tarefa.descricao, tarefa.status, tarefa.favorita, tarefa.cor, tarefa.usuario_id, tarefa.id]
        );

        return result.rows[0]
    } catch (error) {
        console.error('Erro ao atualizar tarefa no banco de dados:', error);
        throw new Error('Falha ao atualizar tarefa no banco de dados');
    }
};


//Deletar uma tarefa
const deletarTarefaDb = async (id) => {
    try {
        const result = await db.query('DELETE FROM tarefa WHERE id = $1', [id]);
        return result.rows;
    }
    catch (error) {
        console.error('Erro ao deletar tarefa no banco de dados:', error);
        throw new Error('Falha ao deletar tarefa no banco de dados');
    }
}

module.exports = {
    retornarTodasTarefasDb,
    retornarTarefaEspecificaDb,
    criarTarefaDb,
    atualizarTarefaDb,
    deletarTarefaDb
};