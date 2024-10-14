"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const post_route_1 = require("../modules/post/post.route");
const router = express_1.default.Router();
const moduleRouters = [
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/posts',
        routes: post_route_1.PostRoutes,
    },
    {
        path: '/coupons',
        routes: coupon_route_1.CouponRoutes,
    },
];
moduleRouters.forEach((route) => {
    router.use(route.path, route.routes);
});
exports.default = router;
