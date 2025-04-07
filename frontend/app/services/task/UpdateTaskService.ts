import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";
import {
  UpdateTasksParams,
  UpdateTasksResponseDto,
} from "@/app/data/interfaces/update-task";

export class UpdateTaskService {
  constructor(
    private readonly httpClient: HttpClient<UpdateTasksResponseDto>,
    private readonly path = "/tasks",
  ) {}

  async patch(params: UpdateTasksParams): Promise<UpdateTasksResponseDto> {
    const { statusCode, body } = await this.httpClient.request({
      method: "patch",
      url: `${this.path}/${params.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as UpdateTasksResponseDto;
      default:
        throw new Error();
    }
  }

  async complete(taskId: string): Promise<void> {
    const { statusCode } = await this.httpClient.request({
      method: "patch",
      url: `${this.path}/${taskId}/complete`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return;
      default:
        throw new Error();
    }
  }
}
