import type { Message, SendMessage } from "../types/models";

interface Authenticated {
  authToken: string;
}

export enum EventContext {
  REQUEST = "request", // Sent from client to server
  RESPONSE = "response", // Sent from server to client
}

export type EventDataType = "client-request" | "server-response";

export interface EventData<T extends EventDataType, P extends object> {
  type: T;
  payload: P;
}

export interface EventsMap {
  "chat-message": {
    [EventContext.REQUEST]: EventData<
      "client-request",
      Authenticated & SendMessage
    >;
    [EventContext.RESPONSE]: EventData<"server-response", Message>;
  };
}

export type EventHandlersMap = {
  [key in keyof EventsMap]: (
    data:
      | EventsMap[key][EventContext.REQUEST]
      | EventsMap[key][EventContext.RESPONSE]
  ) => void | Promise<void>;
};
