import { Types } from 'mongoose';
import { USER_ROLE } from './user.contsts';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profile_picture?: string;
  role?: TUserRole;
  following?: Types.ObjectId[];
}

export type TUserLoginDetails = {
  email: string;
  password: string;
};
