# Desafio Técnico – Taskify

Este projeto é uma aplicação fullstack desenvolvida com **Next.js** e **NestJS** que implementa um sistema de gerenciamento de tarefas com autenticação e roteamento protegidos. Os usuários podem buscar, filtrar, ordenar, criar, concluir e deletar tarefas. A aplicação utiliza **Context API**, **Tailwind CSS**, **Flowbite**, **Express.js**, **TypeORM** e **React Icons**.

## Funcionalidades

- 🔐 Autenticação de usuários
- 🔄 Roteamento protegido com Next.js App Router
- 📋 Listagem paginada de tarefas
- 🔎 Busca e filtro por status
- ⬆⬇ Ordenação por título e status
- ➕ Criação de novas tarefas
- ✅ Conclusão e exclusão de tarefas
- 📊 Contador e seletor de itens por página

## 📦 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Nesj.js](https://nestjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Express.js](https://expressjs.com/)

## Como rodar o projeto

1. Clone o repositório e acessa a pasta:

```bash
   git clone https://github.com/MCastegnaro/Taskify.git

   cd taskify
```

2. Muita **atenção** aqui! Existem duas formas de rodar o projeto.

- A primeira, é rodar cada projeto de forma individual. Caso você opte por essa abordagem, cada projeto tem o seu readme.md explicando o passo a passo para subir cada aplicação e garantir que as duas funcionem corretamente.
- A segunda é criando as aplicações com docker e docker-compose!

3. Caso você opte por rodar com o `docker-compose`, note que na raiz deste projeto há um arquivo chamado `docker-compose.yml`. Rode o comando:

```bash
docker-compose up -d
```

4. Após rodar o comando, os containers serão criados e configurados com as aplicações:

![alt text](/assets/docker.png)

5. As aplicações estão disponíveis em:

- Frontend: http://localhost:3001/login
- Backend: http://localhost:3000/
- Adminer: http://localhost:8080/

6. Configurando o Adminer, esse camarada é um SGBD que irá te ajudar a fazer a gestão dos dados de uma forma prática. Para configurá-lo é bem simples, basta adicionar os seguintes dados:

![alt text](/assets/adminer.png)

Sendo:

- Motor de Base de dados: PostgreSQL
- Servidor: pgsql
- User: pguser
- Password: pgpassword
- Base de dados: taskifydb

7. Aproveitar o projeto!

## Estrutura do Projeto front

```bash
app/
├── (pages)/             # Rotas principais do app
│   ├── login/           # Página de login
│   ├── register/        # Página de cadastro
│   └── tasks/           # Página protegida com as tarefas
│       ├── page.tsx     # Página principal de tarefas
│       ├── 404.tsx      # Página de erro
│       └── layout.tsx   # Layout compartilhado
│
├── globals.css          # Estilos globais da aplicação
│
components/              # Componentes reutilizáveis
├── header/              # Cabeçalho e navegação
├── modal/               # Modais reutilizáveis
├── table/               # Tabelas de dados
└── tabs/                # Componentes de abas

config/
└── adapters/            # Adaptadores de requisições (ex: Axios)
    └── axiosAdapter.ts

contexts/                # Contextos globais (Auth, Toast, Task)
├── auth/
│   └── AuthContext.tsx
├── task/
│   └── TaskContext.tsx
└── toast/
    └── ToastContext.tsx

data/                    # Dados estáticos e auxiliares
interfaces/              # Interfaces TypeScript
types/                   # Tipagens globais
hooks/                   # Hooks personalizados
services/                # Serviços de comunicação com a API

assets/                  # Imagens e outros recursos visuais

cypress/                 # Testes End-to-End com Cypress
├── e2e/                 # Testes de fluxo do sistema
├── fixtures/            # Mocks para testes
├── support/             # Configuração global do Cypress

public/                  # Arquivos públicos
.env.example             # Exemplo do arquivo de variáveis de ambiente
```

## Estrutura do projeto backend

```bash
src/
├── config/                # Configurações globais do projeto
│   └── database/
│       ├── entities/      # Entidades do TypeORM (ex: User)
│       ├── migrations/    # Arquivos de migração
│       ├── db.module.ts   # Módulo de conexão com o banco
│       └── typeOrm.migration-config.ts # Config para CLI do TypeORM
│
├── modules/               # Módulos de funcionalidades
│   ├── auth/              # Autenticação e autorização
│   │   ├── dto/           # DTOs de autenticação
│   │   ├── services/      # Serviços relacionados
│   │   ├── auth.controller.ts
│   │   ├── auth.guard.ts
│   │   └── auth.module.ts
│   │
│   ├── task/              # Funcionalidades de tarefas
│   │   ├── dto/
│   │   ├── services/
│   │   ├── task.controller.ts
│   │   └── task.module.ts
│   │
│   └── user/              # Gerenciamento de usuários
│       ├── dto/
│       ├── services/
│       ├── user.controller.ts
│       └── user.module.ts
│
├── main.ts                # Ponto de entrada da aplicação
└── app.module.ts          # Módulo raiz
```

## Funcionalidade da Tabela

A tabela permite:

- Busca com debounce a partir de 3 caracteres
- Ordenação clicando nos cabeçalhos
- Paginação com controle de quantos itens por página
- Dropdown de ações com opções de concluir ou excluir tarefas
- Filtro por status diretamente no select do cabeçalho

![alt text](/assets/fav.png)

## Observações

- A listagem é paginada com base em itemsPerPage
- A ordenação é reativa e persistida entre mudanças de estado
- O componente TaskModal é usado tanto para criação quanto para edição (extensível)
