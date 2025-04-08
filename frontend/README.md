# 💻 Frontend - Next.js

Este é o projeto de frontend da aplicação, desenvolvido com [Next.js](https://nextjs.org/). Ele fornece a interface de usuário da aplicação.

## 🚀 Tecnologias

- React + Next.js
- TypeScript
- Tailwind CSS
- Flowbite
- Cypress

## ✅ Pré-requisitos

- Node.js 18+
- Yarn (ou npm)

## 📦 Como rodar este front-end

1. Na raiz desta pasta rode `npm install` e instale as dependências.
2. Configure o .env, existe um `.env.exemple` com as variaveis necessárias.
3. Execute sua aplicação usando o comando `npm run dev`.
4. Acesse a rota de /login.
5. Se tudo deu certo, você chegará nesta tela:

![alt text](/assets/login.png)

## Funcionalidades da UI

🔐 Autenticação

- Login do usuário com persistência de token.
- Proteção de rotas: impede acesso à dashboard sem estar autenticado.
- Redirecionamento automático para login/logout.

📋 Gestão de Tarefas

Listagem de tarefas com:

- Título, descrição e status.
- Ordenação por título e status (ASC/DESC).
- Paginação dinâmica com seleção de itens por página.
- Contador total de tarefas.

🔍 Busca e Filtro

- Busca por título de tarefa (a partir de 3 caracteres).
- Filtro por status usando select:
  -- Todos
  -- Em andamento
  -- Concluído (ou outros definidos via enum TaskStatus)

➕ Criação de Tarefa

- Abertura de modal (TaskModal) para cadastrar nova tarefa.
- Envio dos dados para API e atualização da listagem.

✅ Ações da Tarefa

Menu suspenso (Dropdown) com ações:

- Concluir tarefa
- Deletar tarefa

# Screenshots

Registro de usuários
![alt text](/assets/registro.png)

Listagem de tarefas
![alt text](/assets/listagem.png)

Ações de modais

![alt text](/assets/acoes.png)

Modal

![alt text](/assets/modal.png)
