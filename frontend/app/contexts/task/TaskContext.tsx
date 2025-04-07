"use client";

import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";

import { CreateTasksParams } from "@/app/data/interfaces/create-task";
import { UpdateTasksParams } from "@/app/data/interfaces/update-task";
import { SearchType } from "@/app/data/types/search";
import { Task, TaskStatus } from "@/app/data/types/task";
import { useAuth } from "@/app/hooks/useAuthContext";
import { useToast } from "@/app/hooks/useToastContext";
import { CreateTaskService } from "@/app/services/task/CreateTaskService";
import { DeleteTaskService } from "@/app/services/task/DeleteTaskService";
import { ListTaskService } from "@/app/services/task/ListTaskService";
import { UpdateTaskService } from "@/app/services/task/UpdateTaskService";
import { createContext, ReactNode, useCallback, useState } from "react";

interface TaskContextProps {
  selectedStatus: TaskStatus;
  setSelectedStatus: (status: TaskStatus) => void;
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;

  search: string;
  setSearch: (value: string) => void;
  searchType: SearchType;
  setSearchType: (value: SearchType) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortDirection: "ASC" | "DESC";
  setSortDirection: (direction: "ASC" | "DESC") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItemsFounded: number;
  setTotalItemsFounded: (total: number) => void;
  totalItems: number;
  setTotalItems: (total: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  ListPaginated: (
    search?: string,
    selectedStatus?: string,
    page?: number,
  ) => Promise<void>;
  handleStatusFilter: (status: string) => void;
  CreateTask: (params: CreateTasksParams) => Promise<void>;
  UpdateTask: (params: UpdateTasksParams) => Promise<void>;
  DeleteTask: (taskId: string) => Promise<void>;
  CompleteTask: (taskId: string) => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined,
);

const axios = new AxiosAdapter();

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [sortField, setSortField] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalItemsFounded, setTotalItemsFounded] = useState<number>(1);

  const { ShowToast } = useToast();
  const { user } = useAuth();

  const handleStatusFilter = useCallback((status: string) => {
    setSearchType("status");
    setSelectedStatus(status as TaskStatus);
  }, []);

  const ListPaginated = useCallback(
    async (search = "", selectedStatus = "", page = 1) => {
      const {
        tasks: newTasks,
        totalCount,
        tasksFounded,
      } = await new ListTaskService(axios).list({
        search,
        selectedStatus,
        type: searchType,
        page,
        limit: itemsPerPage,
        orderBy: sortField,
        orderDirection: sortDirection,
      });
      setTasks(newTasks);
      setTotalItems(totalCount);
      setTotalItemsFounded(tasksFounded);
    },
    [itemsPerPage, searchType, sortDirection, sortField],
  );

  const CreateTask = useCallback(
    async (params: CreateTasksParams) => {
      const userId = user!.id;

      await new CreateTaskService(axios)
        .create(userId, params)
        .then(() => {
          ShowToast("Tarefa criada com sucesso!", "success");
        })
        .catch(() => {
          ShowToast("Erro ao criar a tarefa!", "error");
        })
        .finally(() => {
          setIsModalOpen(false);
          ListPaginated(search, selectedStatus, currentPage);
        });
    },
    [ListPaginated, currentPage, search, selectedStatus, ShowToast],
  );

  const UpdateTask = useCallback(async (params: UpdateTasksParams) => {
    await new UpdateTaskService(axios)
      .patch(params)
      .then(() => {
        ShowToast("Tarefa editada com sucesso!", "success");
      })
      .catch(() => {
        ShowToast("Erro ao editar a tarefa!", "error");
      })
      .finally(() => {
        setIsModalOpen(false);
        ListPaginated(search, selectedStatus, currentPage);
      });
  }, []);

  const DeleteTask = useCallback(async (taskId: string) => {
    await new DeleteTaskService(axios)
      .remove(taskId)
      .then(() => {
        ShowToast("Tarefa removida com sucesso!", "success");
      })
      .catch(() => {
        ShowToast("Erro ao remover a tarefa!", "error");
      })
      .finally(() => {
        setIsModalOpen(false);
        ListPaginated(search, selectedStatus, currentPage);
      });
  }, []);

  const CompleteTask = useCallback(async (taskId: string) => {
    await new UpdateTaskService(axios)
      .complete(taskId)
      .then(() => {
        ShowToast("Tarefa concluida com sucesso!", "success");
      })
      .catch(() => {
        ShowToast("Erro ao concluir a tarefa!", "error");
      })
      .finally(() => {
        setIsModalOpen(false);
        ListPaginated(search, selectedStatus, currentPage);
      });
  }, []);

  const value: TaskContextProps = {
    CreateTask,
    UpdateTask,
    DeleteTask,
    CompleteTask,
    handleStatusFilter,
    selectedStatus,
    setSelectedStatus,
    tasks,
    setTasks,
    isModalOpen,
    setIsModalOpen,
    search,
    setSearch,
    searchType,
    setSearchType,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    totalItems,
    setTotalItems,
    itemsPerPage,
    setItemsPerPage,
    ListPaginated,
    totalItemsFounded,
    setTotalItemsFounded,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
