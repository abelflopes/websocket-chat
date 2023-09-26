import type { AuthSign } from "@abelflopes/websocket-chat-api-client";

interface Actions {
  reset: () => void;
  sign: (
    username: AuthSign["username"],
    password: AuthSign["password"]
  ) => Promise<void>;
}

export interface State {
  authToken: string | undefined;
  error: string | undefined;
  loading: number;
}

export type Module = State & Actions;
