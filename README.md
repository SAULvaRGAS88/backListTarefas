# API Lista de Tarefas - Node.js

🚀 Desenvolvido por: Saul Vargas 🚀

[LinkedIn](https://www.linkedin.com/in/saul-vargas-68a97347/)

## 📋 Visão Geral

Esta é uma API RESTful desenvolvida em Node.js para gerenciamento de usuários e tarefas. A aplicação utiliza uma arquitetura em camadas (MVC) e está configurada para deploy no Vercel.

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com a seguinte estrutura:

```
backListTarefas/
├── controller/          # Camada de controle (regras de negócio)
├── models/             # Camada de modelo (acesso a dados)
├── rotas/              # Camada de roteamento (endpoints)
├── db/                 # Configuração do banco de dados
├── index.js            # Arquivo principal da aplicação
└── vercel.json         # Configuração para deploy no Vercel
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **pg** - Driver PostgreSQL para Node.js
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Desenvolvimento (hot reload)

## 🗄️ Estrutura do Banco de Dados

### Tabela: `usuario`
- `id` - Identificador único
- `nome` - Nome do usuário
- `email` - Email do usuário
- `senha` - Senha do usuário
- `created_at` - Data de criação

### Tabela: `tarefa`
- `id` - Identificador único
- `nome` - Nome da tarefa
- `descricao` - Descrição da tarefa
- `status` - Status da tarefa
- `favorita` - Se a tarefa é favorita
- `cor` - Cor da tarefa
- `usuario_id` - ID do usuário proprietário
- `created_at` - Data de criação

## 🚀 Funcionalidades

### 👥 Gestão de Usuários

#### Endpoints Disponíveis:
- `GET /usuarios` - Listar todos os usuários
- `GET /usuarios/:id` - Buscar usuário específico (com suas tarefas)
- `POST /usuarios/login` - Login por email e senha
- `POST /usuarios` - Criar novo usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário

#### Funcionalidades:
- ✅ Criação de usuários com validação de dados obrigatórios
- ✅ Busca de usuário específico com suas tarefas associadas
- ✅ Sistema de login por email e senha
- ✅ Atualização de dados do usuário
- ✅ Exclusão de usuários
- ✅ Validação de email duplicado
- ✅ Retorno de dados seguros (sem senha em listagens)

### 📝 Gestão de Tarefas

#### Endpoints Disponíveis:
- `GET /tarefas` - Listar todas as tarefas
- `GET /tarefas/:id` - Buscar tarefa específica
- `POST /tarefas` - Criar nova tarefa
- `PUT /tarefas/:id` - Atualizar tarefa
- `DELETE /tarefas/:id` - Deletar tarefa

#### Funcionalidades:
- ✅ Criação de tarefas com validação de dados obrigatórios
- ✅ Busca de tarefas específicas
- ✅ Atualização de tarefas
- ✅ Exclusão de tarefas
- ✅ Associação de tarefas a usuários
- ✅ Sistema de favoritos
- ✅ Personalização por cores
- ✅ Controle de status das tarefas

## 🔧 Configuração e Instalação

### Pré-requisitos:
- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação:
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env com:
DATABASE_URL=sua_url_de_conexao_postgresql

# Execute o projeto
npm run dev
```

### Scripts Disponíveis:
- `npm start` - Inicia o servidor com nodemon
- `npm run dev` - Inicia o servidor em modo desenvolvimento

## 🌐 Deploy

A aplicação está configurada para deploy no **Vercel** através do arquivo `vercel.json`.

### Configuração do Vercel:
- **Runtime**: Node.js
- **Entry Point**: `index.js`
- **Build Command**: Automático
- **Output Directory**: Raiz do projeto

## 📊 Respostas da API

Todas as respostas seguem um padrão consistente:

### Sucesso:
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { /* dados retornados */ }
}
```

### Erro:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Descrição do erro",
  "data": null
}
```

## 🔒 Segurança

- **CORS** configurado para aceitar requisições de qualquer origem
- **Validação de dados** em todas as operações
- **Sanitização de respostas** (senhas não são retornadas em listagens)
- **Tratamento de erros** padronizado
- **Verificação de existência** antes de operações de atualização/exclusão

## 🎯 Características Técnicas

- **Arquitetura em camadas** bem definida
- **Separação de responsabilidades** clara
- **Tratamento de erros** robusto
- **Validação de entrada** consistente
- **Código limpo** e bem documentado
- **Preparado para produção** com configuração do Vercel

## 📝 Exemplo de Uso

### Criar um usuário:
```bash
POST /usuarios
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Criar uma tarefa:
```bash
POST /tarefas
{
  "nome": "Estudar Node.js",
  "descricao": "Aprender conceitos avançados",
  "status": "pendente",
  "favorita": true,
  "cor": "#FF5733",
  "usuario_id": 1
}
```

---

**Desenvolvido com ❤️ usando Node.js e Express**
