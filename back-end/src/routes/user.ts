import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";
import { authMiddleware, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user.id,
      username: user.username,
    });
  }
);

export default router;
