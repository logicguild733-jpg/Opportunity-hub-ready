import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import leadsRouter from "./routes/leads";
import { fetchRSSLeads } from "./services/rssLeads";
import { fetchGoogleLeads } from "./services/googleLeads";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// -------------------------
// Middleware
// -------------------------

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Temporary auth for testing
app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    id: "test-user-1",
    email: "logicguild733@gmail.com",
    skills: ["teacher"],
    plan: "basic",
  };

  next();
});

// -------------------------
// Health check
// -------------------------

app.get("/test", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Backend working",
  });
});

// -------------------------
// Lead importers
// -------------------------

async function runImporters() {
  console.log("=================================");
  console.log("Starting lead importers...");
  console.log("=================================");

  // Google / Serper
  try {
    console.log("Starting Google importer...");

    const googleCount = await fetchGoogleLeads();

    console.log(
      `Google importer finished. Added: ${googleCount}`
    );
  } catch (error) {
    console.error("Google importer failed:", error);
  }

  // RSS
  try {
    console.log("Starting RSS importer...");

    const rssCount = await fetchRSSLeads();

    console.log(
      `RSS importer finished. Added: ${rssCount}`
    );
  } catch (error) {
    console.error("RSS importer failed:", error);
  }

  console.log("=================================");
  console.log("All importers finished");
  console.log("=================================");
}

// -------------------------
// Run immediately on startup
// -------------------------

runImporters();

// -------------------------
// Run every hour
// -------------------------

setInterval(async () => {
  console.log("=================================");
  console.log("Running scheduled lead import...");
  console.log("=================================");

  await runImporters();
}, 60 * 60 * 1000);

// -------------------------
// API routes
// -------------------------

app.use("/api/leads", leadsRouter);

// -------------------------
// Default route
// -------------------------

app.get("/", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Opportunity Hub API Server running",
  });
});

// -------------------------
// Start server
// -------------------------

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Opportunity Hub API running on port ${PORT}`);
});
