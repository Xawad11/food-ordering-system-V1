import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import uploadRouter from "./routers/upload.router.js";
import { dbconnect } from "./config/database.config.js";

// Database Connection
const connectDB = async () => {
  try {
    await dbconnect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // Adjust if deploying
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Important for form data

// Routes
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("⚠️ Error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
