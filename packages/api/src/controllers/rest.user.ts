import type { ApiRoute } from "../types/rest-controllers";
import * as AuthToken from "../models/auth-token";
import * as User from "../models/user";

export const me: ApiRoute<"/user"> = {
  endpoint: "/user",
  method: "get",
  action: async (request) => {
    const [, authToken] = request.headers.authorization?.split("Bearer ") ?? [
      undefined,
    ];

    if (!authToken) {
      return {
        status: 400,
        data: {
          description: "Auth token not provided",
        },
      };
    }

    const userId = await AuthToken.getUserId(authToken);

    console.log("AUTH TOKEN", authToken);
    console.log("USER ID", userId);

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
          description: "User not found",
        },
      };
    }

    return {
      status: 200,
      data: {
        id: user.id,
        username: user.username,
      },
    };
  },
};
