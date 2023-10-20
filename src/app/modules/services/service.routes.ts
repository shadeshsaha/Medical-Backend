import express from 'express';

import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import { MedServiceController } from './service.controller';

const router = express.Router();

router.get('/', MedServiceController.getAllServices);

router.get('/:serviceId', MedServiceController.getSingleService);

router.post(
  '/create-service',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  // validateRequest(MedServiceValidation.createService),
  MedServiceController.createNewService
);

router.patch(
  '/:serviceId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  MedServiceController.updateService
);

router.delete(
  '/:serviceId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  MedServiceController.SingleServiceDelete
);

export const ServiceRoutes = router;
