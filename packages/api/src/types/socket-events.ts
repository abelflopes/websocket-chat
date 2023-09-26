import type { Message, SendMessage } from "../types/models";

interface Authenticated {
  authToken: string;
}

interface Request {
  type: "client-request";
}

interface Response {
  type: "server-response";
}

export enum EventContext {
  REQUEST = "request", // Sent from client to server
  RESPONSE = "response", // Sent from server to client
}

export interface EventsMap {
  "chat-message": {
    [EventContext.REQUEST]: Request & Authenticated & SendMessage;
    [EventContext.RESPONSE]: Response & Message;
  };
}

export type EventHandlersMap = {
  [key in keyof EventsMap]: (
    data:
      | EventsMap[key][EventContext.REQUEST]
      | EventsMap[key][EventContext.RESPONSE]
  ) => void | Promise<void>;
};
