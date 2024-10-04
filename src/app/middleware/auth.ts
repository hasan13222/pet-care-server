import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

export const verifyToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // check if token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export const verifyCookieToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    // check if token is missing
    if (!token) {
      console.log('token is missing')
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = {...decoded as JwtPayload, token, name: user.name};
    next();
  });
};

