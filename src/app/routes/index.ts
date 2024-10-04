import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';
import { PostRoutes } from '../modules/post/post.route';
const router = express.Router();

const moduleRouters = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/posts',
    routes: PostRoutes,
  },
  {
    path: '/coupons',
    routes: CouponRoutes,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
