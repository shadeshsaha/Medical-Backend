import { userRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './users.controller';
import { UserValidation } from './users.validations';

const router = express.Router();

// Get All Users
router.get(
  '/',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  UserController.getAllUsersController
);

// Get My Profile
router.get(
  '/my-profile',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER, userRole.DOCTOR),
  UserController.getMyProfile
);

// Get Single User
router.get(
  '/:userId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  UserController.getSingleUser
);

// Update My User data
router.patch(
  '/update-my-email-password',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(UserValidation.updateUser),
  UserController.updateMyUserInfo
);

// Update Profile Data
router.patch(
  '/update-profile/:profileId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(UserValidation.updateUser),
  UserController.updateProfileInfo
);

// Update My Profile Data
router.patch(
  '/update-my-profile',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER, userRole.DOCTOR),
  validateRequest(UserValidation.updateUser),
  UserController.updateMyProfileInfo
);

export const UserRoutes = router;
