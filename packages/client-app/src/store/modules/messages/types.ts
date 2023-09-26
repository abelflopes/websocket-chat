import type { Message } from "@abelflopes/websocket-chat-api-client";

interface Actions {
  reset: () => void;
  add: (message: Message) => void;
  send: (content: string) => Promise<void>;
}

export interface State {
  data: Message[];
  loading: number;
  error: string | undefined;
}

export type Module = State & Actions;

export type { Message } from "@abelflopes/websocket-chat-api-client";
