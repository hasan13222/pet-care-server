/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  const newPost = payload;
  const result = await Post.create(newPost);
  return result;
};

const getMyPostFromDB = async (userId: string) => {
  const result = await Post.find({ user: userId })
    .populate('user')
    .populate({
      path: 'comments.userId',
      model: 'User',
    })
    .sort('-createdAt');
  return result;
};

const getUserPostFromDB = async (userId: string) => {
  const result = await Post.find({ user: userId })
    .populate('user')
    .populate({
      path: 'comments.userId',
      model: 'User',
    })
    .sort('-createdAt');
  return result;
};

const getAllPostFromDB = async (limit: number) => {
  const result = await Post.find()
    .populate('user')
    .populate({
      path: 'comments.userId',
      model: 'User',
    })
    .populate({
      path: 'replies.userId',
      model: 'User',
    })
    .sort('-createdAt')
    .limit(limit);
  return result;
};

const getPostsSummaryFromDB = async () => {
  const posts = await Post.estimatedDocumentCount();
  const premiumPosts = await Post.countDocuments({type: "premium"});
  const tips = await Post.countDocuments({category: "tip"});
  return {posts, premiumPosts, tips}
}

// const getSingleFromDB = async (id: string) => {
//   const result = await Post.findById(id);
//   return result;
// };

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const interactPostIntoDB = async (id: string, payload: any, queryObj: any) => {
  if (queryObj?.upvoted === 'true') {
    await Post.findByIdAndUpdate(
      id,
      { $pull: { upvote: payload.downvote } },
      { new: true },
    );
  }
  if (queryObj?.downvoted === 'true') {
    await Post.findByIdAndUpdate(
      id,
      { $pull: { downvote: payload.upvote } },
      { new: true },
    );
  }
  if (queryObj?.updateComment === 'edit') {
    await Post.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: payload.comments?._id } } },
      { new: true },
    );
    delete payload.comments._id;
  }
  if (queryObj?.updateComment === 'delete') {
    const deletedCommnetPost = await Post.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: payload.comments?._id } } },
      { new: true },
    );
    return deletedCommnetPost;
  }
  if (queryObj?.updateReply === 'edit') {
    await Post.findByIdAndUpdate(
      id,
      { $pull: { replies: { _id: payload.replies?._id } } },
      { new: true },
    );
    delete payload.replies._id;
  }
  if (queryObj?.updateReply === 'delete') {
    const deletedReplyPost = await Post.findByIdAndUpdate(
      id,
      { $pull: { replies: { _id: payload.replies?._id } } },
      { new: true },
    );
    return deletedReplyPost;
  }
  if ('_id' in payload) {
    delete payload._id;
  }
  const result = await Post.findByIdAndUpdate(
    id,
    { $push: payload },
    { new: true },
  );
  
  return result;
};

const accessUserForPremiumPostIntoDB = async (
  id: string,
  payload: any,
) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { $push: payload },
    { new: true },
  );
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  // getSingleFromDB,
  getMyPostFromDB,
  interactPostIntoDB,
  accessUserForPremiumPostIntoDB,
  getUserPostFromDB,
  getPostsSummaryFromDB
};
