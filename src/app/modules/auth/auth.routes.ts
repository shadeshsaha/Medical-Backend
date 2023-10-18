import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../users/users.validations';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUser),
  AuthController.createNewUser
);

router.post(
  '/login',
  validateRequest(UserValidation.loginUser),
  AuthController.userLogin
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
