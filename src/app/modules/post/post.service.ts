import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (payload: TPost) => {
  const newPost = payload;
  const result = await Post.create(newPost);
  return result;
};

// const getAllPostFromDB = async () => {
//   const result = await Post.find();
//   return result;
// };

// const getSingleFromDB = async (id: string) => {
//   const result = await Post.findById(id);
//   return result;
// };

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// const deletePostFromDB = async (id: string) => {
//   const result = await Post.findByIdAndDelete(id);
//   return result;
// };

export const PostServices = {
  createPostIntoDB,
  // getAllPostFromDB,
  updatePostIntoDB,
  // deletePostFromDB,
  // getSingleFromDB
};
