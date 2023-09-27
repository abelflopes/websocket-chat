import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { APP_PORT } from "@abelflopes/websocket-chat-config/config.json";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(APP_PORT),
  },
  plugins: [react(), tsconfigPaths()],
});
