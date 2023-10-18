// import { userRole } from '@prisma/client';
import express from 'express';
// import auth from '../../middlewares/auth';
import { UserController } from './users.controller';

const router = express.Router();

router.get(
  '/',
  // auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  UserController.getAllUsersController
);

export const UserRoutes = router;
