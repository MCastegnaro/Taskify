"use client";

import {
  status,
  StatusConverter,
  Task,
  TaskStatus,
} from "@/app/data/types/task";
import { useTaskContext } from "@/app/hooks/useTaskContext";
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import TaskModal from "../modal/TaskModal";

const Table = () => {
  const {
    tasks,
    isModalOpen,
    setIsModalOpen,
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
    DeleteTask,
    UpdateTask,
    CompleteTask,
  } = useTaskContext();

  const [initialData, setInitialData] = useState<Task | undefined>(undefined);

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

  const handleEditTask = (task: Task) => {
    setIsModalOpen(true);
    setInitialData(task);
  };

  const handleSubmit = async (data: Task) => {
    if (initialData) {
      UpdateTask({
        ...data,
        id: initialData.id,
      });
      return;
    }
    CreateTask(data);
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
    <div className="flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-x border-t p-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-t-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <h3 className="text-lg font-semibold text-blue-800">
            Tarefas adicionadas
          </h3>
          <span className="rounded-sm bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            {totalItems + " tarefas"}
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
            onClick={() => {
              setInitialData(undefined);
              setIsModalOpen(true);
            }}
            className="rounded-md bg-blue-800 px-4 py-2 text-white hover:bg-blue-700"
          >
            Criar Tarefa
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-50 text-sm">
              <th
                className="cursor-pointer border-l pl-4 text-left sm:pl-16"
                onClick={() => toggleSort("title")}
              >
                Título{" "}
                {sortField === "title"
                  ? sortDirection === "ASC"
                    ? "⬆"
                    : "⬇"
                  : ""}
              </th>
              <th className="p-2 text-center">Descrição</th>
              <th
                className="cursor-pointer p-2 text-center"
                onClick={() => toggleSort("status")}
              >
                Status{" "}
                {sortField === "status"
                  ? sortDirection === "ASC"
                    ? "⬆"
                    : "⬇"
                  : ""}
              </th>
              <th className="p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item: Task, index: number) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="max-w-96 truncate pl-4 sm:pl-16">
                  {item.title}
                </td>
                <td className="truncate p-2 pl-4 text-center sm:pl-16">
                  {item.description}
                </td>
                <td className="p-2 text-center">
                  {StatusConverter[item.status]}
                </td>
                <td className="flex justify-center p-2 text-center">
                  <button
                    role="button"
                    className="button-complete"
                    data-cy="btn-dropdown-actions"
                  >
                    <Dropdown
                      arrowIcon={false}
                      inline
                      dismissOnClick={true}
                      data-cy="btn-dropdown-actions"
                      className="p-2"
                      as={"button"}
                      label={
                        <HiDotsVertical className="cursor-pointer text-lg text-gray-600" />
                      }
                    >
                      <Dropdown.Item
                        data-cy="dropdown-edit"
                        onClick={() => handleEditTask(item)}
                      >
                        Editar tarefa
                      </Dropdown.Item>
                      <Dropdown.Item
                        data-cy="dropdown-complete"
                        onClick={() => CompleteTask(item.id)}
                      >
                        Concluir tarefa
                      </Dropdown.Item>
                      <Dropdown.Item
                        data-cy="dropdown-remove"
                        onClick={() => DeleteTask(item.id)}
                      >
                        Remover tarefa
                      </Dropdown.Item>
                    </Dropdown>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tasks.length <= 0 && (
        <div className="flex w-full items-center justify-center border-x bg-gray-50 hover:bg-gray-200">
          <p className="p-10">Sem tarefas cadastradas :(</p>
        </div>
      )}

      <div className="mb-20 flex flex-col items-center justify-between gap-4 border border-t-0 p-6 sm:flex-row sm:px-16">
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
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className="rounded-md bg-gray-50 px-4 py-2 text-blue-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {"<- Anterior"}
              </button>
              <button
                disabled={currentPage === handlePagination()}
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, handlePagination()))
                }
                className="rounded-md bg-gray-50 px-4 py-2 text-blue-800 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {"Próxima ->"}
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => handleSubmit(data as Task)}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default Table;
