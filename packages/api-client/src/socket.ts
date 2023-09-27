/**
 * This module abstracts socket.io interface in order to properly inject
 * types as the client `io()` does not support the events map generic
 * as opposite to the server instance
 */

import type { EventHandlersMap } from "@abelflopes/websocket-chat-api";
import { io } from "socket.io-client";

const ioSocket = io("http://192.168.1.142:3000"); // http://localhost:3000

const on = <T extends keyof EventHandlersMap>(
  event: T,
  callback: EventHandlersMap[T]
): (() => void) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const eventName = event as string;

  ioSocket.on(eventName, callback);

  return () => ioSocket.off(eventName, callback);
};

const emit = <T extends keyof EventHandlersMap>(
  event: T,
  ...data: Parameters<EventHandlersMap[T]>
): void => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const eventName = event as string;

  ioSocket.emit(eventName, ...data);
};

export const socket = { ...ioSocket, on, emit };
