import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
