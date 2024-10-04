import { verifyToken } from '../../middleware/auth';
import { CouponControllers } from './coupon.controller';
import express from 'express';
const router = express.Router();

router.post('/', verifyToken('admin'), CouponControllers.createCoupon);
router.get('/',  CouponControllers.getAllCoupon);
router.delete('/:id', verifyToken('admin'), CouponControllers.deleteCoupon);
router.patch('/:id', verifyToken('admin'), CouponControllers.updateCoupon);

export const CouponRoutes = router;
