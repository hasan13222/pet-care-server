import { Types } from "mongoose";
import { POST_CATEGORY, POST_TYPE } from "./post.consts";

export type TPostCategory = keyof typeof POST_CATEGORY;
export type TPostType = keyof typeof POST_TYPE;

export type TPostComment = {
  userId: Types.ObjectId;
  comment: string;
}
export interface TPost {
  user: Types.ObjectId;
  description?: string;
  image_attachments?: string[];
  type: TPostType;
  category: TPostCategory;
  upvote?: Types.ObjectId[];
  downvote?: Types.ObjectId[];
  comments?: TPostComment[];
  status?: "active"|"blocked";
  accessUser?: Types.ObjectId[];
}
