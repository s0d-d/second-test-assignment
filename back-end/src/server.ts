import express, { Application, Request, Response } from "express";
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
import fs from "fs";
import http from "http";
import https from "https";

dotenv.config();

const app: Application = express();
const env: string = process.env.NODE_ENV || "dev";
const port: number = parseInt(process.env.PORT || "5000", 10);
const dbUri: string =
  process.env.DB_URI || "mongodb://localhost:27017/second-test-assignment";

const privkey: string = process.env.PRIVKEY || "";
const fullchain: string = process.env.FULLCHAIN || "";

if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

let server: http.Server | https.Server;

if (env === "dev") {
  server = http.createServer(app);
} else if (env === "production") {
  if (!privkey || !fullchain) {
    throw new Error(
      "SSL certificates are not properly defined in environment variables"
    );
  }

  const key = fs.readFileSync(privkey);
  const cert = fs.readFileSync(fullchain);
  const httpsOptions: https.ServerOptions = {
    key: key,
    cert: cert,
  };

  server = https.createServer(httpsOptions, app);
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
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to connect to MongoDB", err);
  });
