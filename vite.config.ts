import path from "node:path";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import reactPlugin from "@vitejs/plugin-react-swc";
import millionPlugin from "million/compiler";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/student/student65/u65301280011/IKEA-DeskShop/",
// });

export default defineConfig(({ command }) => {
  return {
    plugins: [
      millionPlugin.vite({ auto: true, optimize: true, mute: true }),
      reactPlugin(),
      TanStackRouterVite({
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
        quoteStyle: "single",
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    base:
      command === "build"
        ? "/student/student65/u65301280011/IKEA-DeskShop/"
        : "/",
  };
});
