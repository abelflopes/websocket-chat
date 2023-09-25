import type { GenericApiRoute } from "../types/rest-controllers";

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
