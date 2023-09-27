import { httpServer } from "./server";

httpServer.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Server running\nhttp://localhost:3000");
});
