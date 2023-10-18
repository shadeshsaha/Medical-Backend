import express from 'express';

import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SpecializationController } from './specialization.controller';
import { StylesValidation } from './specialization.validation';

const router = express.Router();

router.post(
  '/',
  //   auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(StylesValidation.createSpecialization),
  SpecializationController.createNewSpecialization
);

router.get(
  '/',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN, userRole.DOCTOR),
  SpecializationController.getAllSpecialization
);

router.patch(
  '/:specializationId',
  //   auth( userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(StylesValidation.updateSpecialization),
  SpecializationController.updateSpecialization
);

router.delete(
  '/:specializationId',
  //   auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  SpecializationController.deleteSpecialization
);

export const SpecializationRoutes = router;
