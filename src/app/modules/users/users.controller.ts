import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from './users.interface';
import { UserService } from './users.service';

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await UserService.getAllUserService(options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Users retrieved successfully',
      data: result,
    });
  }
);

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User retrieved successfully',
    data: result,
  });
});

const updateProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { profileId } = req.params;
  const payload = req.body;
  const result = await UserService.updateProfileInfo(profileId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

// const updateMyProfileInfo = catchAsync(async (req: Request, res: Response) => {
//   const profileId = (req.user as IRequestUser).profileId;
//   const payload = req.body;
//   const result = await UserService.updateMyProfileInfo(profileId, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Profile updated successfully',
//     data: result,
//   });
// });

// const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const payload = req.body;
//   const result = await UserService.updateUserInfo(userId, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User updated successfully',
//     data: result,
//   });
// });

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  // console.log('req: ', req);
  const userId = (req.user as IRequestUser).userId;
  const result = await UserService.getMyProfile(userId);

  console.log(userId, result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile data retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsersController,
  getSingleUser,
  updateProfileInfo,
  // updateMyProfileInfo,
  // updateUserInfo,
  getMyProfile,
};
