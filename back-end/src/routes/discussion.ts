import { Router, Request, Response } from "express";
import { Discussion, IDiscussion } from "../models/discussion";

const router = Router();

// Start a new discussion
router.post("/", async (req, res) => {
  const { number, userId } = req.body;
  const discussion = new Discussion({ number, userId, result: number });
  await discussion.save();
  res.status(201).json(discussion);
  console.log("saved successfully");
});

// Respond to a discussion with an operation
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { operation, number } = req.body;

  const parentDiscussion = await Discussion.findById(id);
  if (!parentDiscussion)
    return res.status(404).json({ error: "Discussion not found" });

  let result: number;

  switch (operation) {
    case "+":
      result = parentDiscussion.result + number;
      break;
    case "-":
      result = parentDiscussion.result - number;
      break;
    case "*":
      result = parentDiscussion.result * number;
      break;
    case "/":
      result = parentDiscussion.result / number;
      break;
    default:
      return res.status(400).json({ error: "Invalid operation" });
  }

  const discussion = new Discussion({
    number: number,
    operation,
    result,
    parentId: id,
  });
  await discussion.save();

  res.status(201).json(discussion);
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const discussions = (await Discussion.aggregate([
      {
        $graphLookup: {
          from: "discussions",
          startWith: "$parent",
          connectFromField: "parent",
          connectToField: "_id",
          as: "children",
        },
      },
    ]).exec()) as IDiscussion[];

    // Create a map to organize discussions by their IDs
    const discussionMap: { [key: string]: IDiscussion } = {};
    discussions.forEach((discussion) => {
      discussion.children = [];
      discussionMap[discussion._id.toString()] = discussion;
    });

    // Organize discussions into a tree
    const rootDiscussions: IDiscussion[] = [];
    discussions.forEach((discussion) => {
      if (discussion.parentId) {
        const parentDiscussion = discussionMap[discussion.parentId.toString()];
        if (parentDiscussion) {
          parentDiscussion.children.push(discussion);
        }
      } else {
        rootDiscussions.push(discussion);
      }
    });

    res.status(200).json(rootDiscussions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discussions" });
  }
});

export default router;
