import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

//! User Create
const createNewUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createNewUser(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

export const AuthController = {
  createNewUser,
};
