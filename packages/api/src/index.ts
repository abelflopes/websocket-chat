import { httpServer } from "./server";
import {
  API_PORT,
  API_HOST,
} from "@abelflopes/websocket-chat-config/config.json";

httpServer.listen(API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running\n${API_HOST}`);
});
