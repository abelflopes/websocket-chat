/**
 * This module abstracts socket.io interface in order to properly inject
 * types as the client `io()` does not support the events map generic
 * as opposite to the server instance
 */

import type {
  RequestEventsMap,
  ResponseEventsMap,
} from "@abelflopes/websocket-chat-api";
import { io } from "socket.io-client";

const ioSocket = io("http://localhost:3000");

const on = <T extends keyof ResponseEventsMap>(
  event: T,
  callback: ResponseEventsMap[T]
): (() => void) => {
  const eventName = event as string;

  ioSocket.on(eventName, callback);

  return () => ioSocket.off(eventName, callback);
};

const emit = <T extends keyof RequestEventsMap>(
  event: T,
  ...data: Parameters<RequestEventsMap[T]>
): void => {
  const eventName = event as string;

  ioSocket.emit(eventName, ...data);
};

export const socket = { ...ioSocket, on, emit };
