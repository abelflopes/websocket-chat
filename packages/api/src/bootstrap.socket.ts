import type { SocketController } from "./types/controllers.socket";
// Modules
import * as message from "./controllers/message.socket";

const modules = [...Object.values(message)];

export const bundSocketModules: SocketController = (socketServer) => {
  modules.forEach((use) => {
    use(socketServer);
  });
};
