import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  const newCoupon = payload;
  const result = await Coupon.create(newCoupon);
  return result;
};

const getAllCouponFromDB = async () => {
  const result = await Coupon.find();
  return result;
};
const updateCouponFromDB = async (id: string, updateInfo: Partial<TCoupon>) => {
  const result = await Coupon.findByIdAndUpdate(id, updateInfo);
  return result;
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);
  return result;
};
export const CouponServices = {
  createCouponIntoDB,
  getAllCouponFromDB,
  updateCouponFromDB,
  deleteCouponFromDB,
};
