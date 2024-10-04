import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: true,
    },
    discount_percent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Coupon = model<TCoupon>('Coupon', couponSchema);
