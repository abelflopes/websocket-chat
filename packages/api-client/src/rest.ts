import createClient from "openapi-fetch";
import { type paths } from "@abelflopes/websocket-chat-api";
import { API_HOST } from "@abelflopes/websocket-chat-config/config.json";

export const rest = createClient<paths>({
  baseUrl: API_HOST,
});
