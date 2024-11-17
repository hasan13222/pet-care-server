import bcrypt from 'bcrypt';
import { TUser, TUserLoginDetails } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { TChangePassword } from './auth.interface';
import { sendEmail } from '../../utils/sendEmail';

const changeUserPasswordIntoDB = async (payload: TChangePassword) => {
  //  check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Old Password not matched');
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  
  const result = await User.findByIdAndUpdate(user._id, {password: hashedPassword});
  return result;
};

const sendLinkToEmail = async (payload: TChangePassword) => {
  //  check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // create access token to send to the client
  const jwtPayload = {
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: '30m',
    },
  );

  const resetLink = `http://localhost:3000/reset-password?id=${user._id}&token=${accessToken}`;
  sendEmail(user.email, resetLink);
};

const setForgottenPasswordIntoDB = async (useremail: string, payload: TChangePassword) => {
  //  check if user exists
  console.log(useremail)
  const user = await User.findOne({email: useremail}).select('+password');
  console.log(user)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  
  const result = await User.findByIdAndUpdate(user._id, {password: hashedPassword});
  return result;
};

const createUserIntoDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.role = 'user';
  const hashedPassword = await bcrypt.hash(
    newUser.password,
    Number(config.bcrypt_salt_rounds),
  );
  newUser.password = hashedPassword;
  const result = await User.create(newUser);
  return result;
};

const loginAuth = async (payload: TUserLoginDetails) => {
  //  check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Password not matched');
  }

  const jwtPayload = {
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string, {expiresIn: config.access_token_expires_in});
  const refreshToken = jwt.sign(jwtPayload, config.refresh_token_secret as string, {expiresIn: config.refresh_token_expires_in});

  return { user, token, refreshToken };
};




export const AuthServices = {
  createUserIntoDB,
  loginAuth,
  changeUserPasswordIntoDB,
  setForgottenPasswordIntoDB,
  sendLinkToEmail
};
