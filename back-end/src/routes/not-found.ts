import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  return res.status(404);
});

export default router;
