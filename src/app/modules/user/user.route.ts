import express from 'express';
import { UserControllers } from './user.controller';
import { verifyToken } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.delete('/:userId', verifyToken('admin'), UserControllers.deleteUser);

router.patch('/:id/promote', verifyToken('admin'), UserControllers.promoteUser());
router.patch('/:id/follow', verifyToken(), UserControllers.followUser());
router.patch('/:id/unfollow', verifyToken(), UserControllers.unfollowUser());
router.get('/me', verifyToken(), UserControllers.getUser);
router.get('/:userId', verifyToken(), UserControllers.getOtherUser);
router.put(
  '/me',
  verifyToken(),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);
router.get('/followers/:userId', UserControllers.getUserFollowers)

export const UserRoutes = router;
