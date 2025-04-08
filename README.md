# Projeto de Tarefas com Next.js

Este projeto é uma aplicação fullstack desenvolvida com **Next.js** **NestJS** que implementa um sistema de gerenciamento de tarefas com autenticação e roteamento protegidos. Os usuários podem buscar, filtrar, ordenar, criar, concluir e deletar tarefas. A aplicação utiliza **Context API**, **Tailwind CSS**, **Flowbite**, **Express.js**, **TypeORM** e **React Icons**.

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

## Estrutura do Projeto

- hooks/useTaskContext.ts: Gerencia o contexto global das tarefas
- components/table/Table.tsx: Componente principal da tabela de tarefas
- components/modal/TaskModal.tsx: Modal para criação de novas tarefas
- data/types/task.ts: Tipagens das tarefas
- pages/api/: Endpoints de API (exemplo, se aplicável)
- app/: Estrutura do App Router (Next.js 13+)

## Funcionalidade da Tabela

A tabela permite:

- Busca com debounce a partir de 3 caracteres
- Ordenação clicando nos cabeçalhos
- Paginação com controle de quantos itens por página
- Dropdown de ações com opções de concluir ou excluir tarefas
- Filtro por status diretamente no select do cabeçalho

## Observações

- A listagem é paginada com base em itemsPerPage
- A ordenação é reativa e persistida entre mudanças de estado
- O componente TaskModal é usado tanto para criação quanto para edição (extensível)
