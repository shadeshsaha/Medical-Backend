// import { userRole } from '@prisma/client';
import express from 'express';
// import auth from '../../middlewares/auth';
import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import { UserController } from './users.controller';
// import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// Get all Users
router.get(
  '/',
  // auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  UserController.getAllUsersController
);

// Get single user
router.get(
  '/:userId',
  // auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER, userRole.DOCTOR),
  UserController.getSingleUser
);

// Get My Profile
router.get(
  '/my-profile/:userId',
  // '/my-profile',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER, userRole.DOCTOR),
  UserController.getMyProfile
);

// Update My Profile data
router.patch(
  '/update-profile/:profileId',
  // auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  // validateRequest(UserValidation.updateUser),
  UserController.updateProfileInfo
);

// // Update User data
// router.patch(
//   '/update-user/:userId',
//   // auth(userRole.ADMIN, userRole.SUPER_ADMIN),
//   // validateRequest(UserValidation.updateUser),
//   UserController.updateUserInfo
// );

// // Update My Profile data
// router.patch(
//   '/update-my-profile',
//   // auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER, userRole.DOCTOR),
//   // validateRequest(UserValidation.updateUser),
//   UserController.updateMyProfileInfo
// );

export const UserRoutes = router;
