import express from 'express';

import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validations';

const router = express.Router();

router.get('/', FaqController.getAllFaqs);

router.post(
  '/create-faq',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(FaqValidation.createFaq),
  FaqController.createNewFaq
);

router.patch(
  '/update/:faqId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(FaqValidation.updateFaq),
  FaqController.updateFaqDetails
);

router.delete(
  '/delete/:faqId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  FaqController.deleteFaq
);

export const FaqRoutes = router;
