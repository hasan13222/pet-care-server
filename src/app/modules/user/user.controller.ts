import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserFromDB(req?.user?.email);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Profile retrieved successfully',
    data: result,
  });
});

const getOtherUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await UserServices.getOtherUserFromDB(userId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Profile retrieved successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Profile retrieved successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await UserServices.deleteUserFromDB(userId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserIntoDB(
    req?.user?.email,
    req.body,
  );
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});
const promoteUser = () =>
  catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await UserServices.promoterUserToAdmin(userId);
    sendResponse(res, {
      status: StatusCodes.OK,
      message: 'User Promoted successfully',
      data: result,
    });
  });

const followUser = () =>
  catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await UserServices.followUserIntoDB(userId, req.body);
    sendResponse(res, {
      status: StatusCodes.OK,
      message: 'User Promoted successfully',
      data: result,
    });
  });

  const unfollowUser = () =>
  catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await UserServices.unfollowUserIntoDB(userId, req.body);
    sendResponse(res, {
      status: StatusCodes.OK,
      message: 'User Promoted successfully',
      data: result,
    });
  });

export const UserControllers = {
  getUser,
  updateUser,
  getAllUser,
  deleteUser,
  promoteUser,
  getOtherUser,
  followUser,
  unfollowUser
};
