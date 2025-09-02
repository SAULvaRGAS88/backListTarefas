//Model usuario
const db = require('../../db/ConexaoDb');

//Retornar todos os usuarios
/**Busca todas as pessoas no banco */
const retornarTodosUsuariosDb = async () => {
    try {
        const result = await db.query('SELECT * FROM usuario');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar pessoas no banco de dados:', error);
        throw new Error('Falha ao acessar todas as pessoas no banco de dados');
    }
}

//Retornar um usuario especifico
const retornarUsuarioEspecificoDb = async (id) => {
    try {
        const result = await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar usuario no banco de dados:', error);
        throw new Error('Falha ao acessar usuario no banco de dados');
    }
}

//Criar um usuario
const criarUsuarioDb = async (usuario) => {
    try {
        const result = await db.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, usuario.senha]);
        return result.rows;
    }
    catch (error) {
        console.error('Erro ao criar usuario no banco de dados:', error);
        throw new Error('Falha ao criar usuario no banco de dados');
    }
}

//Atualizar um usuario
const atualizarUsuarioDb = async (usuario) => {
    try {
        const result = await db.query(
            'UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
            [usuario.nome, usuario.email, usuario.senha, usuario.id]
        );

        return result.rows[0]
    } catch (error) {
        console.error('Erro ao atualizar usuario no banco de dados:', error);
        throw new Error('Falha ao atualizar usuario no banco de dados');
    }
};


//Deletar um usuario
const deletarUsuarioDb = async (id) => {
    try {
        const result = await db.query('DELETE FROM usuario WHERE id = $1', [id]);
        return result.rows;
    }
    catch (error) {
        console.error('Erro ao deletar usuario no banco de dados:', error);
        throw new Error('Falha ao deletar usuario no banco de dados');
    }
}

module.exports = {
    retornarTodosUsuariosDb,
    retornarUsuarioEspecificoDb,
    criarUsuarioDb,
    atualizarUsuarioDb,
    deletarUsuarioDb
};