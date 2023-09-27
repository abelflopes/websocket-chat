import type { ApiRoute } from "../types/controllers.rest";
import * as AuthToken from "../models/auth-token";
import * as Message from "../models/message";
import { isValidSendMessage } from "../utils/type-guards";
import { socketServer } from "../server";

export const user: ApiRoute<"/message"> = {
  endpoint: "/message",
  method: "post",
  action: async ({ headers, body }) => {
    const authData = await AuthToken.getData(headers.authorization);

    if (
      !authData.authToken ||
      Boolean(authData.error) ||
      !authData.valid ||
      !authData.user
    ) {
      return {
        status: 400,
        data: {
          description: authData.error,
        },
      };
    }

    if (!isValidSendMessage(body)) {
      return {
        status: 400,
        data: {
          description: "Invalid payload",
        },
      };
    }

    const message = await Message.create({
      senderName: authData.user.username,
      senderId: authData.user.id,
      content: body.content,
    });

    socketServer.emit("chat-message", {
      type: "server-response",
      payload: message,
    });

    return {
      status: 200,
      data: message,
    };
  },
};
