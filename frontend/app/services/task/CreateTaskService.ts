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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYjRhOTE5NC01YzljLTQwNzktOGIzYS02OGI2MGFhZWM4NjQiLCJ1c2VybmFtZSI6Im1jYXN0ZWduYXJvIiwiaWF0IjoxNzQzOTcwODU2LCJleHAiOjE3NDQwNTcyNTZ9.rmYMjnCdwxdk-SporSY_ra4PNbKB7ejcdNs3N1Biyqg`,
      },
      body: { ...params, userId },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body as CreateTasksResponseDto;
      default:
        throw new Error();
    }
  }
}
