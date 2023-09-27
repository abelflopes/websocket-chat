import type { GenericApiRoute } from "../types/controllers.rest";

export const notFound: GenericApiRoute<{ error: string }> = {
  endpoint: "*",
  method: "get",
  action: () => ({
    status: 404,
    data: {
      error: "Endpoint not found",
    },
  }),
};
