
import { User } from '../user/user.model';
import { TUser } from './user.interface';

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email }).select('+');
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select('+');
  return result;
};

const updateUserIntoDB = async (
  email: string,
  payload: Pick<TUser, 'name' | 'address' | 'phone' | 'profile_picture'>,
) => {
  const result = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const promoterUserToAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, {role: 'admin'});
  return result;
};


export const UserServices = {
  getUserFromDB,
  updateUserIntoDB,
  getAllUserFromDB,
  deleteUserFromDB,
  promoterUserToAdmin
};
