import { userRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogsController } from './blogs.controller';
import { BlogValidation } from './blogs.validation';

const router = express.Router();

router.post(
  '/create-blog',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(BlogValidation.createBlog),
  BlogsController.createNewBlog
);

router.get(
  '/',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  BlogsController.getAllBlogs
);
router.get(
  '/:blogId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  BlogsController.getSingleBlog
);

router.patch(
  '/:blogId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(BlogValidation.updateBlog),
  BlogsController.updateBlog
);
router.delete(
  '/:blogId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  BlogsController.deleteBlog
);

export const BlogRoutes = router;
