import type { AuthSign, Auth } from "@abelflopes/websocket-chat-api-client";

interface Actions {
  reset: () => void;
  sign: (
    username: AuthSign["username"],
    password: AuthSign["password"]
  ) => Promise<void>;
  validate: (token: Auth["authToken"]) => Promise<void>;
  refresh: (token: Auth["authToken"]) => Promise<void>;
}

export interface State {
  data: {
    authToken: string | undefined;
    valid: boolean;
  };
  error: string | undefined;
  loading: number;
}

export type Module = State & Actions;
