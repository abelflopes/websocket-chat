import type { Express } from "express";
// Modules
import * as root from "./controllers/rest.root";
import * as auth from "./controllers/rest.auth";
import * as user from "./controllers/rest.user";
import * as notFound from "./controllers/rest.not-found";

const routes = [
  ...Object.values(root),
  ...Object.values(auth),
  ...Object.values(user),
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
