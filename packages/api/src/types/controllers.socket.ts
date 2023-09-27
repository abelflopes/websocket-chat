import type * as SocketIO from "socket.io";
import type { EventHandlersMap } from "../types/socket-events";

export type SocketController = (
  socketServer: SocketIO.Server<EventHandlersMap>
) => void;
