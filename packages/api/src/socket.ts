import * as SocketIO from "socket.io";
import type {
  RequestEventsMap,
  ResponseEventsMap,
} from "./types/socket-events";
import { type Server } from "node:http";
import { CORS_ALLOW } from "./config";
import * as AuthToken from "./models/auth-token";

export const createSocketServer = (server: Server): void => {
  const socketServer = new SocketIO.Server<
    RequestEventsMap & ResponseEventsMap
  >(server, {
    cors: {
      origin: CORS_ALLOW,
    },
  });

  socketServer.on("connection", (socket) => {
    console.log("Socket server connected");

    socket.on("chat-message", async (data) => {
      console.log("Socket server message", data);

      // Request from client
      if ("authToken" in data) {
        const userId = await AuthToken.getUserId(data.authToken);

        if (userId) {
          socketServer.emit("chat-message", {
            userId,
            message: data.message,
          });
        } else {
          throw new Error("User ID not found");
        }
      }
    });
  });
};
