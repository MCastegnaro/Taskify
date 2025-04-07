# Projeto de Tarefas com Next.js

Este projeto é uma aplicação desenvolvida com **Next.js** que implementa um sistema de gerenciamento de tarefas com autenticação e roteamento protegidos. Os usuários podem buscar, filtrar, ordenar, criar, concluir e deletar tarefas. A aplicação utiliza **Context API**, **Tailwind CSS**, **Flowbite**, e **React Icons**.

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
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/MCastegnaro/Taskify.git
   cd taskify
   ```

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
