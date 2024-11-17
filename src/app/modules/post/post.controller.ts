import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { PostServices } from './post.service';
import stripe from 'stripe'
import config from '../../config';

const stripeinstance = new stripe(config.stripe_secret as string);

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.createPostIntoDB({...req.body, user: req.user._id});
  return sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Post Added successfully',
    data: result,
  });
});


const getMyPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getMyPostFromDB(req.user._id);
  if (result.length === 0) {
    return sendResponse(res, {
      success: false,
      status: StatusCodes.OK,
      message: 'No Data found',
      data: result,
    });
  }
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'All Posts retrieved successfully',
    data: result,
  });
});

const getUserPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await PostServices.getUserPostFromDB(userId);
  if (result.length === 0) {
    return sendResponse(res, {
      success: false,
      status: StatusCodes.NOT_FOUND,
      message: 'No Data found',
      data: result,
    });
    
  }
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'All Posts retrieved successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  const result = await PostServices.getAllPostFromDB(limit);
  if (result.length === 0) {
    return sendResponse(res, {
      success: false,
      status: StatusCodes.NOT_FOUND,
      message: 'No Data found',
      data: result,
    });
  }
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'All Posts retrieved successfully',
    data: result,
  });
});

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

const interactPost = catchAsync(async (req: Request, res: Response) => {
  const PostId = req.params.id;
  const queryObj = req.query;
  const result = await PostServices.interactPostIntoDB(PostId, req.body, queryObj);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Post updated successfully',
    data: result,
  });
});

const paymentForPremiumPost = catchAsync(async (req: Request, res: Response) => {
  const PostId = req.params.id;

  const paymentIntent = await stripeinstance.paymentIntents.create({
    amount: 20,
    currency: 'usd',
    payment_method_types: ['card'],
    description: 'Software development services',
    shipping: {
      name: req.body.accessUser,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
  });

  
  const result = await PostServices.accessUserForPremiumPostIntoDB(PostId, req.body);

  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Payment done successfully',
    data: {
      clientSecret: paymentIntent.client_secret,
      result
    },
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const PostId = req.params.id;
  const result = await PostServices.deletePostFromDB(PostId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Post deleted successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  // getSinglePost,
  getMyPosts, 
  interactPost,
  paymentForPremiumPost,
  getUserPosts
};
