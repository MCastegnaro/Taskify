"use client";

import { Task } from "@/app/data/interfaces/task";
import { status, StatusConverter, TaskStatus } from "@/app/data/types/task";
import { useTaskContext } from "@/app/hooks/useTaskContext";
import { Alert } from "flowbite-react";
import { useEffect } from "react";
import TaskModal from "../modal/TaskModal";

const Table = () => {
  const {
    tasks,
    isModalOpen,
    setIsModalOpen,
    showAlertMessage,
    search,
    setSearch,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
    ListPaginated,
    totalItemsFounded,
    handleStatusFilter,
    selectedStatus,
    CreateTask,
  } = useTaskContext();

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(field);
      setSortDirection("ASC");
    }
  };

  const handlePagination = (): number => {
    if (search.length >= 3) {
      if (totalItemsFounded <= itemsPerPage) return 1;
      return Math.round(totalItemsFounded / itemsPerPage);
    }

    if (totalItemsFounded <= itemsPerPage) return 1;

    return Math.round(totalItems / itemsPerPage);
  };

  useEffect(() => {
    ListPaginated(search, selectedStatus, currentPage);
  }, [
    search,
    currentPage,
    ListPaginated,
    sortField,
    sortDirection,
    selectedStatus,
  ]);

  return (
    <div className="flex max-w-7xl flex-col justify-center">
      <div className="flex items-center justify-between gap-4 rounded-t-sm border-x border-t p-8 pl-16">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Tarefas adicionadas
          </h3>
          <span className="me-2 rounded-sm bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {totalItems + " tarefas"}
          </span>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por tarefa..."
            className="rounded-md border border-gray-200 px-4 py-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 p-2 text-blue-800 hover:bg-gray-100"
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value as TaskStatus)}
          >
            {status.map((status) => (
              <option key={status.code} value={status.code}>
                {status.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-700"
          >
            Criar Tarefa
          </button>
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50">
            <th
              className="cursor-pointer border-l pl-16 text-left"
              onClick={() => toggleSort("title")}
            >
              Título{" "}
              {sortField === "title"
                ? sortDirection === "ASC"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th className="cursor-pointer p-2 text-center">Descrição</th>
            <th
              className="cursor-pointer border-r p-4"
              onClick={() => toggleSort("status")}
            >
              Status{" "}
              {sortField === "status"
                ? sortDirection === "ASC"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item: Task, index: number) => (
            <tr
              key={item.id}
              className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="max-w-96 truncate pl-16">{item.title}</td>
              <td className="p-2 text-center">{item.description}</td>
              <td className="p-4 text-center">
                {StatusConverter[item.status]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tasks.length <= 0 && (
        <div className="flex w-full items-center justify-center border-x bg-gray-50 hover:bg-gray-200">
          <p className="p-10">Sem tarefas cadastradas :(</p>
        </div>
      )}

      <div className="mb-20 flex items-center justify-between border border-t-0 p-8 px-16">
        {tasks.length > 0 && (
          <>
            <select
              className="rounded-md border border-gray-200 bg-gray-50 p-2"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={itemsPerPage} disabled>
                {itemsPerPage}
              </option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
            </select>
            <span>
              Página {currentPage} de {handlePagination()}
            </span>
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className="rounded-md bg-gray-50 px-4 py-2 text-blue-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {"<- Previous"}
              </button>
              <button
                disabled={currentPage === handlePagination()}
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, handlePagination()))
                }
                className="rounded-md bg-gray-50 px-4 py-2 text-blue-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {"Next ->"}
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => CreateTask(data)}
        />
      )}

      {showAlertMessage.show && (
        <div className="absolute right-4 top-24 flex">
          <Alert className="p-6" color={showAlertMessage.color}>
            {showAlertMessage.message}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Table;
