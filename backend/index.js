// backend/index.js
import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Allow all origins

// Test route
app.get("/", (req, res) => {
  console.log("Received request on /");
  return res.status(200).send("Welcome to MERN stack app");
});

// Book routes
app.use("/books", bookRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
