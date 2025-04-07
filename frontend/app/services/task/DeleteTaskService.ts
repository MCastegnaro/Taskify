import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

export class DeleteTaskService {
  constructor(
    private readonly httpClient: HttpClient<void>,
    private readonly path = "/tasks",
  ) {}

  async remove(taskId: string): Promise<void> {
    const { statusCode } = await this.httpClient.request({
      method: "delete",
      url: `${this.path}/${taskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYjRhOTE5NC01YzljLTQwNzktOGIzYS02OGI2MGFhZWM4NjQiLCJ1c2VybmFtZSI6Im1jYXN0ZWduYXJvIiwiaWF0IjoxNzQzOTcwODU2LCJleHAiOjE3NDQwNTcyNTZ9.rmYMjnCdwxdk-SporSY_ra4PNbKB7ejcdNs3N1Biyqg`,
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
