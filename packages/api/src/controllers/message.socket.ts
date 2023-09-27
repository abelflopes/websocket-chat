import * as AuthToken from "../models/auth-token";
import * as Message from "../models/message";
import * as User from "../models/user";
import type { SocketController } from "../types/controllers.socket";

export const chatMessage: SocketController = (socketServer) => {
  socketServer.on("connection", (socket) => {
    console.log("Socket server connected");

    socket.on("chat-message", async (data) => {
      console.log("Socket server message", data);

      if (data.type === "client-request") {
        const userId = await AuthToken.getUserId(data.payload.authToken);

        // TODO: Emit error with socket
        if (!userId) throw new Error("User ID not found");

        const user = await User.getById(userId);

        if (!user) throw new Error("User info not found");

        const message = await Message.create({
          senderId: userId,
          senderName: user.username,
          content: data.payload.content,
        });

        socketServer.emit("chat-message", {
          type: "server-response",
          payload: message,
        });
      }

      if (data.type === "server-response") {
        socketServer.emit("chat-message", data);
      }
    });
  });
};
