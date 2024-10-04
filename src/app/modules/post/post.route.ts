import express from 'express';
import { PostControllers } from './post.controller';
import { verifyToken } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { PostValidations } from './post.validation';
const router = express.Router();


router.post('/', verifyToken(), validateRequest(PostValidations.createPostValidationSchema), PostControllers.createPost);
router.patch('/:id', verifyToken(), validateRequest(PostValidations.updatePostValidationSchema), PostControllers.updatePost);

export const PostRoutes = router;
