import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const jsconfigPaths = (await import("vite-jsconfig-paths")).default;

  return {
    plugins: [react(), jsconfigPaths()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
