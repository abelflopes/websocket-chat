import * as SocketIO from "socket.io";
import type { EventHandlersMap } from "./types/socket-events";
import { type Server } from "node:http";
import { CORS_ALLOW } from "./config";
import * as AuthToken from "./models/auth-token";
import * as Message from "./models/message";

export const createSocketServer = (server: Server): void => {
  const socketServer = new SocketIO.Server<EventHandlersMap>(server, {
    cors: {
      origin: CORS_ALLOW,
    },
  });

  socketServer.on("connection", (socket) => {
    console.log("Socket server connected");

    socket.on("chat-message", async (data) => {
      console.log("Socket server message", data);

      if (data.type === "client-request") {
        const userId = await AuthToken.getUserId(data.authToken);

        // TODO: Emit error with socket
        if (!userId) throw new Error("User ID not found");

        const message = await Message.create({
          senderId: userId,
          content: data.content,
        });

        socketServer.emit("chat-message", {
          type: "server-response",
          ...message,
        });
      }

      if (data.type === "server-response") {
        socketServer.emit("chat-message", data);
      }
    });
  });
};
