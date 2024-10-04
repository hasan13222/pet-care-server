import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponServices.createCouponIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Coupon Added successfully',
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponServices.getAllCouponFromDB();
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Coupon Retrieved successfully',
    data: result,
  });
});


const updateCoupon = catchAsync(async (req: Request, res: Response) => {
    const couponId = req.params.id;
    const result = await CouponServices.updateCouponFromDB(couponId, req.body);
    sendResponse(res, {
      status: StatusCodes.OK,
      message: 'Bike deleted successfully',
      data: result,
    });
  });


  const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
    const couponId = req.params.id;
    const result = await CouponServices.deleteCouponFromDB(couponId);
    sendResponse(res, {
      status: StatusCodes.OK,
      message: 'Bike deleted successfully',
      data: result,
    });
  });

export const CouponControllers = {
  createCoupon,
  getAllCoupon,
  deleteCoupon,
  updateCoupon
};
