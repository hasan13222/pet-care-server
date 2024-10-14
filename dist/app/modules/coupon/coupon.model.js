"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    discount_percent: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
