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

  async patch(
    taskId: string,
    params: UpdateTasksParams,
  ): Promise<UpdateTasksResponseDto> {
    const { statusCode, body } = await this.httpClient.request({
      method: "patch",
      url: `${this.path}/${taskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYjRhOTE5NC01YzljLTQwNzktOGIzYS02OGI2MGFhZWM4NjQiLCJ1c2VybmFtZSI6Im1jYXN0ZWduYXJvIiwiaWF0IjoxNzQzOTcwODU2LCJleHAiOjE3NDQwNTcyNTZ9.rmYMjnCdwxdk-SporSY_ra4PNbKB7ejcdNs3N1Biyqg`,
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
}
