import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendAuthResponse, sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import { StatusCodes } from 'http-status-codes';
// import config from '../../config';
import  jwt, {JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  const data = Object.assign(result);
  delete data.password;

  console.log("signup", result)
  return sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: data,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changeUserPasswordIntoDB(req.body);
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.sendLinkToEmail(req.body);
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const useremail = req.user.email as string;
  const result = await AuthServices.setForgottenPasswordIntoDB(
    useremail,
    req.body,
  );
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginAuth(req.body);
  const { token, user, refreshToken } = result;
  // res.cookie('token', token, {
  //   secure: config.node_env === 'Production',
  //   httpOnly: true,
  //   sameSite: config.node_env === 'Production' ? 'none' : 'lax',
  //   maxAge: 90 * 24 * 60 * 60 * 1000,
  // });
  return sendAuthResponse(res, {
    status: StatusCodes.OK,
    token,
    refreshToken,
    message: 'User Logged In successfully',
    data: user,
  });
});

const checkLogin = () => (req: Request, res: Response) => {
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Logged In successfully',
    data: req?.user,
  });
};

const logout = () => (req: Request, res: Response) => {
  // res.clearCookie('token', {
  //   secure: config.node_env === 'Production',
  //   httpOnly: true,
  //   sameSite: config.node_env === 'Production' ? 'none' : 'lax',
  // });
  console.log('hit here');
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Logged out successfully',
    data: {},
  });
};

const refreshToken = () => (req: Request, res: Response) => {
  const refreshToken = req.headers.cookie?.split('=')[1];
  
  const decoded = jwt.verify(
    refreshToken as string,
    config.refresh_token_secret as string,
  ) as JwtPayload;

  if (!decoded) {
    return sendResponse(res, {
      status: StatusCodes.FORBIDDEN,
      message: 'Accress token has been sent successfully',
      data: null,
    });
  }
  const { email, role } = decoded as JwtPayload;
  const jwtPayload = {
    role,
    email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: config.access_token_expires_in,
  });
  return sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Acceess token has been sent successfully',
    data: { token },
  });
};

export const AuthControllers = {
  signup,
  login,
  checkLogin,
  logout,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
};
