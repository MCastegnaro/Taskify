import {
  CreateTasksParams,
  CreateTasksResponseDto,
} from "@/app/data/interfaces/create-task";
import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

export class CreateTaskService {
  constructor(
    private readonly httpClient: HttpClient<CreateTasksResponseDto>,
    private readonly path = "/tasks",
  ) {}

  async create(
    userId: string,
    params: CreateTasksParams,
  ): Promise<CreateTasksResponseDto> {
    const { statusCode, body } = await this.httpClient.request({
      method: "post",
      url: this.path,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: { ...params, userId },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body as CreateTasksResponseDto;
      case HttpStatusCode.noContent:
        return body as CreateTasksResponseDto;
      default:
        throw new Error();
    }
  }
}
