import { SearchType } from "../types/search";
import { Task } from "../types/task";

export interface FindAllTasksParams {
  type?: SearchType;
  search: string;
  selectedStatus?: string;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export interface FindAllResponseDto {
  tasks: Array<Task>;
  totalCount: number;
  tasksFounded: number;
}
