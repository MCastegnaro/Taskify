export interface CreateTasksParams {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
}

export interface CreateTasksResponseDto {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
}
