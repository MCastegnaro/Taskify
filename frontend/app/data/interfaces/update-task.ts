export interface UpdateTasksParams {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
}

export interface UpdateTasksResponseDto {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
}
