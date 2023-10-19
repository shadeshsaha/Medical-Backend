import { userRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedBackController } from './feedBackForm.controller';
import { FeedBackValidation } from './feedBackForm.validations';

const router = express.Router();

router.post(
  '/add-feedback',
  // auth(userRole.USER),
  validateRequest(FeedBackValidation.createFeedBack),
  FeedBackController.createNewFeedBack
);

router.get(
  '/',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  FeedBackController.getAllFeedBack
);

router.patch(
  '/:feedbackId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  FeedBackController.updateFeedBack
);

router.delete(
  '/:feedbackId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  FeedBackController.singleFeedBackDelete
);

export const FeedBackRoutes = router;
