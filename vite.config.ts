import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./", "./client", "./shared", "./server"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    chunkSizeWarningLimit: 1000,
  },
  base: "/",
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    async configureServer(server) {
      console.log("🔧 [Vite Plugin] Configuring Express plugin...");
      try {
        // Dynamically import to avoid loading during build
        console.log("🔧 [Vite Plugin] Attempting to import ./server/index.ts");
        const module = await import("./server/index.ts");
        console.log("📦 [Vite Plugin] Module loaded successfully");
        console.log("📦 [Vite Plugin] Module exports:", Object.keys(module));

        const { createServer } = module;
        if (!createServer) {
          console.error("❌ [Vite Plugin] createServer function not found in module!");
          console.error("Available exports:", Object.keys(module));
          return;
        }

        console.log("📦 [Vite Plugin] Calling createServer()...");
        const app = createServer();
        console.log("📦 [Vite Plugin] Express app created successfully");
        console.log("📦 [Vite Plugin] Registering Express with Vite middleware...");
        server.middlewares.use(app);
        console.log("✅ [Vite Plugin] Express middleware registered with Vite successfully");
      } catch (error) {
        console.error("❌ [Vite Plugin] Failed to load Express server:");
        console.error("Error message:", error instanceof Error ? error.message : error);
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      }
    },
  };
}
