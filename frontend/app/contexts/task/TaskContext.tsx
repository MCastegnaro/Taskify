"use client";

import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";
import { AlertProps } from "@/app/data/interfaces/alert";
import { CreateTasksParams } from "@/app/data/interfaces/create-task";
import { SearchType } from "@/app/data/types/search";
import { Task, TaskStatus } from "@/app/data/types/task";
import { CreateTaskService } from "@/app/services/task/CreateTaskService";
import { ListTaskService } from "@/app/services/task/ListTaskService";
import { createContext, ReactNode, useCallback, useState } from "react";

interface TaskContextProps {
  selectedStatus: TaskStatus;
  setSelectedStatus: (status: TaskStatus) => void;
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  showAlertMessage: AlertProps;
  setShowAlertMessage: (alert: AlertProps) => void;
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
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined,
);

const axios = new AxiosAdapter();

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlertMessage, setShowAlertMessage] = useState<AlertProps>({
    show: false,
    color: "",
    message: "",
  });
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [sortField, setSortField] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalItemsFounded, setTotalItemsFounded] = useState<number>(1);

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
      console.log("params", params);

      const userId = "fb4a9194-5c9c-4079-8b3a-68b60aaec864";
      await new CreateTaskService(axios)
        .create(userId, params)
        .then(() => {
          setShowAlertMessage({
            show: true,
            color: "green",
            message: "Task created successfully!",
          });
        })
        .catch(() => {
          setShowAlertMessage({
            show: true,
            color: "red",
            message: "Fail to create task.",
          });
        })
        .finally(() => {
          setIsModalOpen(false);
          ListPaginated(search, selectedStatus, currentPage);
          setTimeout(() => {
            setShowAlertMessage({
              show: false,
              color: "",
              message: "",
            });
          }, 3000);
        });
    },
    [ListPaginated, currentPage, search, selectedStatus],
  );

  // const UpdateTask = useCallback(async (params: UpdateTasksParams) => {
  //   await new UpdateTaskService(axios).patch({});
  // }, []);

  // const DeleteTask = useCallback(async (taskId: string) => {
  //   await new DeleteTaskService(axios).remove({});
  // }, []);

  // const ChangeStatus = useCallback(async (params: CreateTasksParams) => {
  //   await new CreateTaskService(axios).({});
  // }, []);

  const value: TaskContextProps = {
    CreateTask,
    handleStatusFilter,
    selectedStatus,
    setSelectedStatus,
    tasks,
    setTasks,
    isModalOpen,
    setIsModalOpen,
    showAlertMessage,
    setShowAlertMessage,
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
