import createClient from "openapi-fetch";
import { type paths } from "@abelflopes/websocket-chat-api";

export const rest = createClient<paths>({
  baseUrl: "http://localhost:3000",
});
