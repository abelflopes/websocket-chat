import type { ApiRoute } from "../types/controllers.rest";
import * as AuthToken from "../models/auth-token";
import * as User from "../models/user";

export const user: ApiRoute<"/user"> = {
  endpoint: "/user",
  method: "get",
  action: async ({ headers }) => {
    const authData = await AuthToken.validate(headers.authorization);

    if (!authData.authToken || Boolean(authData.error) || !authData.valid) {
      return {
        status: 400,
        data: {
          description: authData.error,
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
