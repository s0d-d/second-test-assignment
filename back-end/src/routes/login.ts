import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Secret key for JWT (In production, use an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  // Create JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  // Set the token in an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    signed: true,
    // Prevents access by JavaScript
    // secure: false, // Ensures the cookie is sent over HTTPS only
    // sameSite: "strict",
    // Protects against CSRF attacks
    maxAge: 3600000, // 1 hour
  });

  // Send a success message (you can also send user info if needed)
  return res.json({ message: "Login successful" });
});

export default router;
