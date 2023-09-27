import createClient from "openapi-fetch";
import { type paths } from "@abelflopes/websocket-chat-api";

export const rest = createClient<paths>({
  baseUrl: "http://192.168.1.142:3000", // http://localhost:3000
});
