import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IDiscussion extends Document {
  _id: ObjectId;
  userId: string | null;
  number: number;
  operation: string | null;
  parentId: IDiscussion | null;
  result: number;
  children: IDiscussion[];
  createdAt: Date;
}

const DiscussionSchema: Schema = new Schema({
  userId: { type: String },
  number: { type: Number, required: true },
  operation: { type: String },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
    default: null,
  },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

DiscussionSchema.virtual("children", {
  ref: "Discussion",
  localField: "_id",
  foreignField: "parentId",
});

export const Discussion = mongoose.model<IDiscussion>(
  "Discussion",
  DiscussionSchema
);
