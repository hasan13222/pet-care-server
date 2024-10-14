"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const coupon_controller_1 = require("./coupon.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.verifyToken)('admin'), coupon_controller_1.CouponControllers.createCoupon);
router.get('/', coupon_controller_1.CouponControllers.getAllCoupon);
router.delete('/:id', (0, auth_1.verifyToken)('admin'), coupon_controller_1.CouponControllers.deleteCoupon);
router.patch('/:id', (0, auth_1.verifyToken)('admin'), coupon_controller_1.CouponControllers.updateCoupon);
exports.CouponRoutes = router;
