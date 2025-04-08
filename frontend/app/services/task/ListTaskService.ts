import {
  FindAllResponseDto,
  FindAllTasksParams,
} from "@/app/data/interfaces/find-all-tasks";
import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

export class ListTaskService {
  constructor(
    private readonly httpClient: HttpClient<FindAllResponseDto>,
    private readonly path = "/tasks",
  ) {}

  async list(params: FindAllTasksParams): Promise<FindAllResponseDto> {
    const url = new URL(this.path, process.env.NEXT_PUBLIC_API_URL);
    const searchParams = new URLSearchParams();

    if (params.search.length >= 3) searchParams.append("title", params.search);

    if (params.type === "status" && params.selectedStatus !== "all")
      searchParams.append("status", params.selectedStatus!);

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.orderBy) searchParams.append("orderBy", params.orderBy);
    if (params.orderDirection)
      searchParams.append("orderDirection", params.orderDirection);

    url.search = searchParams.toString();

    const { statusCode, body } = await this.httpClient.request({
      method: "get",
      url: url.toString(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as FindAllResponseDto;
      default:
        throw new Error();
    }
  }
}
