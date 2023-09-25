import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import { createSocketServer } from "./socket";
import { bindApiRoutes } from "./rest";
import bodyParser from "body-parser";
import morgan from "morgan";
import "./db/index";
import { CORS_ALLOW } from "./config";

const app = express();
const server = createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CORS_ALLOW,
  })
);
app.use(morgan("dev"));

bindApiRoutes(app);

createSocketServer(server);

server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Server running\nhttp://localhost:3000");
});
