import * as SocketIO from "socket.io";
import type { EventHandlersMap } from "./types/socket-events";
import { CORS_ALLOW } from "./config";
import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { bindApiRoutes } from "./bootstrap.rest";
import { bundSocketModules } from "./bootstrap.socket";

const app = express();
const httpServer = createServer(app);
const socketServer = new SocketIO.Server<EventHandlersMap>(httpServer, {
  cors: {
    origin: CORS_ALLOW,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CORS_ALLOW,
  })
);
app.use(morgan("dev"));

bindApiRoutes(app);
bundSocketModules(socketServer);

export { httpServer, socketServer };
