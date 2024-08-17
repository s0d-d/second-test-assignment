import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import discussionRoutes from "./routes/discussion";
import notFound from "./routes/not-found";
import loginRoutes from "./routes/login";
import logoutRoutes from "./routes/logout";
import signupRoutes from "./routes/signup";
import userRoutes from "./routes/user";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbUri =
  process.env.DB_URI || "mongodb://localhost:27017/second-test-assignment";

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/discussions", discussionRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/user", userRoutes);

app.get("*", notFound);

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
