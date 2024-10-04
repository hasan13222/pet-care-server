import express from 'express';
import { UserControllers } from './user.controller';
import { verifyToken } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidations } from './user.validation';
const router = express.Router();

router.get('/', verifyToken('admin'), UserControllers.getAllUser);
router.delete('/:userId', verifyToken('admin'), UserControllers.deleteUser);

router.patch('/:id/promote', verifyToken('admin'), UserControllers.promoteUser());
router.get('/me', verifyToken(), UserControllers.getUser);
router.put(
  '/me',
  verifyToken(),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
