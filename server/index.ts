import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import {
  handleContactForm,
  handleTestEmail,
  handleEmailStatus,
} from "./routes/contact.js";

// Log startup to confirm server is loading
console.log("✅ Server module loaded successfully");

export function createServer() {
  const app = express();

  console.log("🏗️  [Server] Creating Express app instance");

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  console.log("🔧 [Server] Middleware configured");

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  console.log("📝 [Server] Registering /api/contact route");

  // Contact form routes
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("\n" + "=".repeat(80));
      console.log("📬 [Server] Contact form request received");
      console.log("🔍 [Server] Request body:", JSON.stringify(req.body));
      console.log("🔍 [Server] Headers sent before handler?", res.headersSent);
      console.log("=".repeat(80) + "\n");

      await handleContactForm(req, res);

      console.log("\n" + "=".repeat(80));
      console.log("✅ [Server] Contact form handler completed");
      console.log("🔍 [Server] Headers sent after handler?", res.headersSent);
      console.log("=".repeat(80) + "\n");
    } catch (error) {
      console.error("❌ [Server] Error in contact form handler:", error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error instanceof Error ? error.message : "Unknown error",
        });
        console.log("📤 [Server] Sent 500 error response from wrapper");
      } else {
        console.log("⚠️  [Server] Headers already sent by handler, not sending error response");
      }
    }
  });
  app.get("/api/email-status", handleEmailStatus);
  app.get("/api/test-email", handleTestEmail); // Development only

  // Error handling middleware
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("❌ Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message || "Unknown error",
    });
  });

  console.log("✅ [Server] All routes registered successfully");
  console.log("📋 [Server] Registered routes:");
  console.log("   - GET  /api/ping");
  console.log("   - GET  /api/demo");
  console.log("   - POST /api/contact");
  console.log("   - GET  /api/email-status");
  console.log("   - GET  /api/test-email");

  return app;
}
