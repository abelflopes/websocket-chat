import type { Express } from "express";
// Modules
import * as root from "./controllers/root.rest";
import * as auth from "./controllers/auth.rest";
import * as user from "./controllers/user.rest";
import * as message from "./controllers/message.rest";
import * as notFound from "./controllers/not-found.rest";

const routes = [
  ...Object.values(root),
  ...Object.values(auth),
  ...Object.values(user),
  ...Object.values(message),
  ...Object.values(notFound),
];

export const bindApiRoutes = (app: Express): void => {
  routes.forEach(({ method, endpoint, action }) => {
    app[method](endpoint, async (request, response) => {
      const { data, status } = await action(request, response);
      request.res?.status(status).send(data);
    });
  });
};
