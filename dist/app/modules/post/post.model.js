"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const post_consts_1 = require("./post.consts");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const postSchema = new mongoose_1.Schema({
    user: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: Object.values(post_consts_1.POST_CATEGORY),
    },
    type: {
        type: String,
        enum: Object.values(post_consts_1.POST_TYPE),
        default: 'regular',
    },
    image_attachments: {
        type: [String],
    },
    upvote: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    downvote: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    comments: {
        type: [commentSchema],
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    accessUser: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
