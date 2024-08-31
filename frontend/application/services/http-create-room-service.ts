import { Right } from "../../@shared/either.ts";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomService,
} from "../../domain/services/index.ts";
import { HttpPostClient } from "../contracts/http/http-post-client.ts";
import { RoomEntity } from "../../domain/entities/room-entity.ts";

export class HttpCreateRoomService implements CreateRoomService {
  private readonly url: string;
  private readonly httpPostClient: HttpPostClient<
    CreateRoomRequest,
    CreateRoomResponse
  >;

  constructor(
    url: string,
    httpPostClient: HttpPostClient<CreateRoomRequest, CreateRoomResponse>,
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  async execute(params: CreateRoomRequest): Promise<CreateRoomResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    return Right<RoomEntity>(httpResponse?.body?.value!);
  }
}