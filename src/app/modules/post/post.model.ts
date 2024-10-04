import { Schema, model } from 'mongoose';
import { TPost, TPostComment } from './post.interface';
import { POST_CATEGORY, POST_TYPE } from './post.consts';

const commentSchema = new Schema<TPostComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }
  }
)
const postSchema = new Schema<TPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(POST_CATEGORY),
    },
    type: {
      type: String,
      enum: Object.values(POST_TYPE),
      default: 'regular',
    },
    image_attachments: {
      type: [String],
    },
    upvote: {
      type: [Schema.Types.ObjectId],
    },
    downvote: {
      type: [Schema.Types.ObjectId],
    },
    comments: {
      type: [commentSchema]
    }
  },
  {
    timestamps: true,
  },
);

export const Post = model<TPost>('Post', postSchema);
