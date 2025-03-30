import { Schema, model } from 'mongoose';
import { TPost, TPostComment, TPostReply } from './post.interface';
import { POST_CATEGORY, POST_TYPE } from './post.consts';

const commentSchema = new Schema<TPostComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const replySchema = new Schema<TPostReply>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    commentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const postSchema = new Schema<TPost>(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
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
      type: [commentSchema],
    },
    replies: {
      type: [replySchema],
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    accessUser: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<TPost>('Post', postSchema);
