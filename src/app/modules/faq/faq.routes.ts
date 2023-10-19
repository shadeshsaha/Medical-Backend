import express from 'express';

import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import { FaqController } from './faq.controller';

const router = express.Router();

router.get('/', FaqController.getAllFaqs);

router.post(
  '/create-faq',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  FaqController.createNewFaq
);

router.patch(
  '/update/:faqId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  FaqController.updateFaqDetails
);

router.delete(
  '/delete/:faqId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  FaqController.deleteFaq
);

export const FaqRoutes = router;
