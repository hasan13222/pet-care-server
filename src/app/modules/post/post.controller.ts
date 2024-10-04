import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.createPostIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Post Added successfully',
    data: result,
  });
});

// const getAllPosts = catchAsync(async (req: Request, res: Response) => {
//   const result = await PostServices.getAllPostFromDB();
//   if (result.length === 0) {
//     sendResponse(res, {
//       success: false,
//       status: StatusCodes.NOT_FOUND,
//       message: 'No Data found',
//       data: result,
//     });
//   }
//   sendResponse(res, {
//     status: StatusCodes.OK,
//     message: 'All Posts retrieved successfully',
//     data: result,
//   });
// });

// const getSinglePost = catchAsync(async (req: Request, res: Response) => {
//   const PostId = req.params.id;
//   const result = await PostServices.getSingleFromDB(PostId);

//   sendResponse(res, {
//     status: StatusCodes.OK,
//     message: 'Single Post retrieved successfully',
//     data: result,
//   });
// });

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const PostId = req.params.id;
  const result = await PostServices.updatePostIntoDB(PostId, req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Post updated successfully',
    data: result,
  });
});

// const deletePost = catchAsync(async (req: Request, res: Response) => {
//   const PostId = req.params.id;
//   const result = await PostServices.deletePostFromDB(PostId);
//   sendResponse(res, {
//     status: StatusCodes.OK,
//     message: 'Post deleted successfully',
//     data: result,
//   });
// });

export const PostControllers = {
  createPost,
  // getAllPosts,
  updatePost,
  // deletePost,
  // getSinglePost
};
