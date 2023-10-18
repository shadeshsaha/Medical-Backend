import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/users.interface';
import { appointmentFilterableFields } from './appointmentBooking.constant';
import { AppointmentBookingService } from './appointmentBooking.service';

const createNewAppointmentBooking = catchAsync(
  async (req: Request, res: Response) => {
    const profileId = (req.user as IRequestUser).profileId;
    const result = await AppointmentBookingService.createAppointmentBooking(
      profileId,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment Booking created successfully!',
      data: result,
    });
  }
);

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AppointmentBookingService.getAllAppointment(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Appointments fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getMyAppointment = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AppointmentBookingService.getMyAppointment(
    profileId,
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Appointment data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await AppointmentBookingService.updateAppointment(
    appointmentId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment Updated successfully',
    data: result,
  });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await AppointmentBookingService.deleteAppointment(
    appointmentId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.appointmentId} Appointment Deleted successfully `,
  });
});

export const AppointmentBookingController = {
  createNewAppointmentBooking,
  getAllAppointment,
  updateAppointment,
  deleteAppointment,
  getMyAppointment,
};
