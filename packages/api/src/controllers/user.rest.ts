import type { ApiRoute } from "../types/controllers.rest";
import * as AuthToken from "../models/auth-token";

export const user: ApiRoute<"/user"> = {
  endpoint: "/user",
  method: "get",
  action: async ({ headers }) => {
    const authData = await AuthToken.getData(headers.authorization);

    if (!authData.authToken || Boolean(authData.error) || !authData.valid) {
      return {
        status: 400,
        data: {
          description: authData.error,
        },
      };
    }

    if (!authData.user) {
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
        id: authData.user.id,
        username: authData.user.username,
      },
    };
  },
};
