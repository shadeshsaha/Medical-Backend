/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ReviewAndRatings } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  ICreateReviewAndRatingReq,
  ICreateReviewAndRatingResponse,
  IUpdateReviewRequest,
} from './reviewAndRating.interface';

const createNewRatingAndReview = async (
  profileId: string,
  payload: ICreateReviewAndRatingReq
): Promise<ICreateReviewAndRatingResponse> => {
  const isExisting = await prisma.service.findUnique({
    where: {
      serviceId: payload.serviceId,
    },
  });

  if (!isExisting) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service not found');
  }

  const createdNewRatingAndReview = await prisma.reviewAndRatings.create({
    data: {
      reviewComment: payload.reviewComment,
      reviewRating: payload.reviewRating,
      serviceId: payload.serviceId,
      profileId,
    },
    select: {
      reviewComment: true,
      reviewRating: true,
      createdAt: true,
      reviewId: true,
    },
  });

  if (!createdNewRatingAndReview) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Review and rating failed to add'
    );
  }

  return createdNewRatingAndReview;
};

const updateRatingAndReview = async (
  reviewId: string,
  payload: Partial<IUpdateReviewRequest>
): Promise<ReviewAndRatings | null> => {
  const isExistReview = await prisma.reviewAndRatings.findUnique({
    where: {
      reviewId,
    },
    select: {
      reviewComment: true,
      reviewRating: true,
      createdAt: true,
      reviewId: true,
    },
  });

  if (!isExistReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found !!!');
  }

  const updateReview = {
    reviewComment: payload?.reviewComment,
    reviewRating: payload?.reviewRating,
  };

  const result = await prisma.reviewAndRatings.update({
    where: {
      reviewId,
    },
    data: updateReview,
  });

  //   console.log('result: ', result);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reviews Updating Failed !!!');
  }
  return result;
};

const SingleRatingAndReviewDelete = async (
  reviewId: string
): Promise<ReviewAndRatings | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExistFeedBack = await transactionClient.reviewAndRatings.findUnique(
      {
        where: {
          reviewId,
        },
      }
    );

    if (!isExistFeedBack) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
    }

    const feedBackDeleted = await transactionClient.reviewAndRatings.delete({
      where: {
        reviewId,
      },
    });

    return feedBackDeleted;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Deleted');
  }
  return result;
};

export const RatingAndReviewService = {
  createNewRatingAndReview,
  updateRatingAndReview,
  SingleRatingAndReviewDelete,
};
