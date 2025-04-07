import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";
import {
  CreateSessionParams,
  CreateSessionParamsResponse,
} from "@/app/data/interfaces/session";

export class CreateSessionService {
  constructor(
    private readonly httpClient: HttpClient<CreateSessionParamsResponse>,
    private readonly path = "/auth",
  ) {}

  async create(
    params: CreateSessionParams,
  ): Promise<CreateSessionParamsResponse> {
    const url = new URL(this.path, "http://localhost:3333");

    console.log("Login payload:", params);

    const { statusCode, body } = await this.httpClient.request({
      method: "post",
      url: `${url}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as CreateSessionParamsResponse;
      default:
        throw new Error();
    }
  }
}
