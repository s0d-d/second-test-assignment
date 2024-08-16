import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne<IUser>({ username: username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await new User({
    username,
    password: hashedPassword,
  }).save();

  return res.status(201).json({ message: "User created successfully" });
});

export default router;
