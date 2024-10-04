import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendAuthResponse, sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  const data = Object.assign(result);
  delete data.password;
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: data,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changeUserPasswordIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.sendLinkToEmail(req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.id as string;
  const result = await AuthServices.setForgottenPasswordIntoDB(userId, req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginAuth(req.body);
  const { token, user } = result;
  res.cookie('token', token, {
    secure: config.node_env === 'Production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  sendAuthResponse(res, {
    status: StatusCodes.OK,
    token,
    message: 'User Logged In successfully',
    data: user,
  });
});


const checkLogin = () => (req: Request, res: Response) => {
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Logged In successfully',
    data: req?.user,
  });
};

const logout = () => (req: Request, res: Response) => {
  res.cookie('token', 'token', {
    secure: config.node_env === 'Production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Logged out successfully',
    data: {},
  });
};

export const AuthControllers = {
  signup,
  login,
  checkLogin,
  logout,
  changePassword,
  forgetPassword,
  resetPassword
};
