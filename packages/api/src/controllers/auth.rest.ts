import type { ApiRoute } from "../types/controllers.rest";
import * as User from "../models/user";
import * as AuthToken from "../models/auth-token";
import type { AuthSuccess, ApiError } from "../types/models";
import { isValidAuthSign } from "../utils/type-guards";

export const authSign: ApiRoute<"/auth/sign"> = {
  endpoint: "/auth/sign",
  method: "post",
  action: async ({ body }) => {
    let status: 200 | 400;
    let data: AuthSuccess | ApiError;

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
