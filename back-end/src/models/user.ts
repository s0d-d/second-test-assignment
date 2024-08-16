import mongoose, { Document, Schema, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
