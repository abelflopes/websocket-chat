import type { Message } from "@abelflopes/websocket-chat-api-client";
import { Store } from "@store/index";

export const selectMessageById = (id: string): Message | undefined =>
  Store.messages((state) => state.data.find((i) => i.id === id));
