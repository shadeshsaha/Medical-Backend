import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { SlotController } from './slots.controller';
// import { SlotValidation } from './slots.validations';
import { userRole } from '@prisma/client';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  // auth(userRole.USER, userRole.ADMIN, userRole.DOCTOR, userRole.SUPER_ADMIN),
  SlotController.getAllSlots
);
router.post(
  '/create-slot',
  auth(userRole.USER),
  //   validateRequest(SlotValidation.createSlot),
  SlotController.createNewSlot
);

router.patch(
  '/:slotId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  // validateRequest(SlotValidation.createSlot),
  SlotController.updateSlot
);

router.delete(
  '/:slotId',
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  // validateRequest(SlotValidation.createSlot),
  SlotController.deleteSlot
);

export const SlotRoutes = router;
