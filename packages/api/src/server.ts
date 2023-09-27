import * as SocketIO from "socket.io";
import type { EventHandlersMap } from "./types/socket-events";
import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { bindApiRoutes } from "./bootstrap.rest";
import { bundSocketModules } from "./bootstrap.socket";
import { API_CORS_ALLOW } from "@abelflopes/websocket-chat-config/config.json";

const app = express();
const httpServer = createServer(app);
const socketServer = new SocketIO.Server<EventHandlersMap>(httpServer, {
  cors: {
    origin: API_CORS_ALLOW,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: API_CORS_ALLOW,
  })
);
app.use(morgan("dev"));

bindApiRoutes(app);
bundSocketModules(socketServer);

export { httpServer, socketServer };
