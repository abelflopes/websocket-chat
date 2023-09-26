import type { UserPublic } from "@abelflopes/websocket-chat-api-client";

interface Actions {
  reset: () => void;
  load: () => Promise<void>;
}

export interface State {
  data: UserPublic | undefined;
  loading: number;
  error: undefined | string;
}

export type Module = State & Actions;
