import type { ApiRoute } from "../types/rest-controllers";
import * as AuthToken from "../models/auth-token";
import * as Message from "../models/message";
import { isValidSendMessage } from "../utils/type-guards";

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

    const message = await Message.create({
      senderId: userId,
      content: body.content,
    });

    return {
      status: 200,
      data: message,
    };
  },
};
