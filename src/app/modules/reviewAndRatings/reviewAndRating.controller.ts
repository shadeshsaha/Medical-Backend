import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RatingAndReviewService } from './reviewAndRating.service';
import { IRequestUser } from '../users/user.interface';

//! slot Create

const createNewSlot = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await RatingAndReviewService.createNewRatingAndReview(
    profileId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot created successfully!',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await RatingAndReviewService.updateRatingAndReview(
    reviewId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback Updated successfully',
    data: result,
  });
});

const singleReviewDelete = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await RatingAndReviewService.SingleRatingAndReviewDelete(
    reviewId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ` ${result?.reviewComment} Deleted successfully`,
  });
});

// get all reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await RatingAndReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Reviews',
    data: result,
  });
});

// get only user reviews
const getOnlyUserReviews = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await RatingAndReviewService.getOnlyUserReviews(profileId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Reviews',
    data: result,
  });
});

export const ReviewController = {
  createNewSlot,
  updateReview,
  singleReviewDelete,
  getAllReviews,
  getOnlyUserReviews,
};
