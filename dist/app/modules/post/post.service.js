"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const createPostIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = payload;
    const result = yield post_model_1.Post.create(newPost);
    return result;
});
const getMyPostFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ user: userId })
        .populate('user')
        .populate({
        path: 'comments.userId',
        model: 'User',
    })
        .sort('-createdAt');
    return result;
});
const getUserPostFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ user: userId })
        .populate('user')
        .populate({
        path: 'comments.userId',
        model: 'User',
    })
        .sort('-createdAt');
    return result;
});
const getAllPostFromDB = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find()
        .populate('user')
        .populate({
        path: 'comments.userId',
        model: 'User',
    })
        .sort('-createdAt')
        .limit(limit);
    return result;
});
// const getSingleFromDB = async (id: string) => {
//   const result = await Post.findById(id);
//   return result;
// };
const updatePostIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const interactPostIntoDB = (id, payload, queryObj) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((queryObj === null || queryObj === void 0 ? void 0 : queryObj.upvoted) === 'true') {
        yield post_model_1.Post.findByIdAndUpdate(id, { $pull: { upvote: payload.downvote } }, { new: true });
    }
    if ((queryObj === null || queryObj === void 0 ? void 0 : queryObj.downvoted) === 'true') {
        yield post_model_1.Post.findByIdAndUpdate(id, { $pull: { downvote: payload.upvote } }, { new: true });
    }
    if ((queryObj === null || queryObj === void 0 ? void 0 : queryObj.updateComment) === 'edit') {
        yield post_model_1.Post.findByIdAndUpdate(id, { $pull: { comments: { userId: (_a = payload.comments) === null || _a === void 0 ? void 0 : _a.userId } } }, { new: true });
    }
    if ((queryObj === null || queryObj === void 0 ? void 0 : queryObj.updateComment) === 'delete') {
        const deletedCommnetPost = yield post_model_1.Post.findByIdAndUpdate(id, { $pull: { comments: { _id: (_b = payload.comments) === null || _b === void 0 ? void 0 : _b._id } } }, { new: true });
        return deletedCommnetPost;
    }
    if ('_id' in payload) {
        delete payload._id;
    }
    const result = yield post_model_1.Post.findByIdAndUpdate(id, { $push: payload }, { new: true });
    return result;
});
const accessUserForPremiumPostIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(id, { $push: payload }, { new: true });
    return result;
});
const deletePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndDelete(id);
    return result;
});
exports.PostServices = {
    createPostIntoDB,
    getAllPostFromDB,
    updatePostIntoDB,
    deletePostFromDB,
    // getSingleFromDB,
    getMyPostFromDB,
    interactPostIntoDB,
    accessUserForPremiumPostIntoDB,
    getUserPostFromDB
};
