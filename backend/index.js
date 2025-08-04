import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { PORT, mongodbURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/books", bookRoutes);

// Serve frontend build (Vite or React)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from dist (React/Vite frontend)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

mongoose
  .connect(mongodbURL, { dbName: "bookstoreDB" }) 
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("👉 Connected to DB:", mongoose.connection.name); 
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
