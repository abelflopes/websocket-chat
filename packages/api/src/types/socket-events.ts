export enum EventContext {
  REQUEST = "request", // Sent from client to server
  RESPONSE = "response", // Sent from server to client
}

export interface EventsMap {
  "chat-message": {
    [EventContext.REQUEST]: {
      authToken: string;
      message: string;
    };
    [EventContext.RESPONSE]: {
      userId: string;
      message: string;
    };
  };
}

export type RequestEventsMap = {
  [key in keyof EventsMap]: (
    data: EventsMap[key][EventContext.REQUEST]
  ) => void | Promise<void>;
};

export type ResponseEventsMap = {
  [key in keyof EventsMap]: (
    data: EventsMap[key][EventContext.RESPONSE]
  ) => void | Promise<void>;
};
