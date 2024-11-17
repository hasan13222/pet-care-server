import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { verifyCookieToken, verifyToken } from '../../middleware/auth';
import { AuthValidations } from './auth.validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signup,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidationSchema),
  AuthControllers.login,
);

router.get('/check-login', verifyCookieToken(), AuthControllers.checkLogin());
router.get('/logout', AuthControllers.logout())
router.post('/change-password', verifyToken(), validateRequest(AuthValidations.changePasswordValidationSchema), AuthControllers.changePassword)
router.post('/forget-password', validateRequest(AuthValidations.forgetPasswordValidationSchema), AuthControllers.forgetPassword)
router.post('/reset-password',verifyToken(), validateRequest(AuthValidations.resetPasswordValidationSchema), AuthControllers.resetPassword)
router.post('/refresh-token', AuthControllers.refreshToken())

export const AuthRoutes = router;
