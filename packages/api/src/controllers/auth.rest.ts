import type { ApiRoute } from "../types/controllers.rest";
import * as User from "../models/user";
import * as AuthToken from "../models/auth-token";
import type { Auth, ApiError } from "../types/models";
import { isValidAuthSign } from "../utils/type-guards";

export const authSign: ApiRoute<"/auth/sign"> = {
  endpoint: "/auth/sign",
  method: "post",
  action: async ({ body }) => {
    let status: 200 | 400;
    let data: Auth | ApiError;

    if (isValidAuthSign(body)) {
      try {
        const user = await User.getOrCreate({
          username: body.username,
          password: body.password,
        });

        const authToken = await AuthToken.create(user.id);

        status = 200;
        data = {
          authToken: authToken.value,
        };
      } catch (error) {
        status = 400;
        data = {
          description: error instanceof Error ? error.message : String(error),
        };
      }
    } else {
      status = 400;
      data = {
        description: "invalid Data",
      };
    }

    return {
      status,
      data,
    };
  },
};

export const validate: ApiRoute<"/auth/validate"> = {
  endpoint: "/auth/validate",
  method: "post",
  action: async ({ headers }) => {
    const authData = await AuthToken.getData(headers.authorization);

    return {
      status: authData.error ? 400 : 200,
      data: authData.error
        ? {
            description: authData.error,
          }
        : {
            valid: authData.valid,
          },
    };
  },
};

export const refresh: ApiRoute<"/auth/refresh"> = {
  endpoint: "/auth/refresh",
  method: "post",
  action: async ({ headers }) => {
    const authData = await AuthToken.getData(headers.authorization);

    const authToken =
      authData.user?.id && authData.valid
        ? await AuthToken.create(authData.user.id)
        : undefined;

    return {
      status: authToken ?? authData.error ? 200 : 400,
      data: authToken
        ? { authToken: authToken.value }
        : {
            description: authData.error ?? "Unable to refresh token",
          },
    };
  },
};
