import type { ApiRoute } from "../types/controllers.rest";
import * as AuthToken from "../models/auth-token";
import * as Message from "../models/message";
import * as User from "../models/user";
import { isValidSendMessage } from "../utils/type-guards";
import { socketServer } from "../server";

export const user: ApiRoute<"/message"> = {
  endpoint: "/message",
  method: "post",
  action: async ({ headers, body }) => {
    const authData = await AuthToken.validate(headers.authorization);

    if (!authData.authToken || Boolean(authData.error) || !authData.valid) {
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

    const userId = await AuthToken.getUserId(authData.authToken);

    if (!userId) {
      return {
        status: 400,
        data: {
          description: "User not found",
        },
      };
    }

    const user = await User.getById(userId);

    if (!user) {
      return {
        status: 400,
        data: {
          description: "User info not found",
        },
      };
    }

    const message = await Message.create({
      senderName: user?.username,
      senderId: userId,
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
