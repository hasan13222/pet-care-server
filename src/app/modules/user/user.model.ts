import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.contsts';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: 'user',
    },
    following: {
      type: [Schema.Types.ObjectId]
    }
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
