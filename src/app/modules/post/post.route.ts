import express from 'express';
import { PostControllers } from './post.controller';
import { verifyToken } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { PostValidations } from './post.validation';
const router = express.Router();

router.get('/my-post', verifyToken(), PostControllers.getMyPosts)
router.get('/:userId', verifyToken(), PostControllers.getUserPosts)
router.get('/', verifyToken(), PostControllers.getAllPosts)
router.post('/', verifyToken(), validateRequest(PostValidations.createPostValidationSchema), PostControllers.createPost);
router.patch('/:id', verifyToken(), validateRequest(PostValidations.updatePostValidationSchema), PostControllers.updatePost);
router.patch('/:id/interact', verifyToken(), PostControllers.interactPost);
router.patch('/:id/payment', verifyToken(), PostControllers.paymentForPremiumPost);
router.delete('/:id', verifyToken(), PostControllers.deletePost);

export const PostRoutes = router;
