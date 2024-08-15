import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import discussionRoutes from "./routes/discussion";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbUri = process.env.DB_URI;

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

app.use(cors());
app.use(express.json());

app.use("/api/discussions", discussionRoutes);

mongoose
  .connect(dbUri as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
