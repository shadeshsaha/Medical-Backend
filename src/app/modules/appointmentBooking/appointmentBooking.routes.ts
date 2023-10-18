import { userRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { AppointmentBookingController } from './appointmentBooking.controller';

const router = express.Router();

router.post(
  '/add-booking',
  auth(userRole.USER),
  AppointmentBookingController.createNewAppointmentBooking
);
router.get(
  '/',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  AppointmentBookingController.getAllAppointment
);
router.get(
  '/my-booking',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  AppointmentBookingController.getMyAppointment
);

router.patch(
  '/:appointmentId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  AppointmentBookingController.updateAppointment
);

router.delete(
  '/:appointmentId',
  auth(userRole.USER, userRole.ADMIN, userRole.SUPER_ADMIN),
  AppointmentBookingController.deleteAppointment
);

export const AppointmentBookingRoutes = router;
