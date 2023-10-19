/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { FeedBackForm, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  FeedBackSearchableFields,
  feedBackRelationalFields,
  feedBackRelationalFieldsMapper,
} from './feedBackForm.constant';
import {
  ICreateFeedBackFormReq,
  ICreateFeedBackFormResponse,
  IFeedBackFilterRequest,
  IUpdateFeedBackRequest,
} from './feedBackForm.interface';

const createNewFeedBackForm = async (
  payload: ICreateFeedBackFormReq
): Promise<ICreateFeedBackFormResponse> => {
  const createdNewFeedBack = await prisma.feedBackForm.create({
    data: {
      feedbackComment: payload.feedbackComment,
      userName: payload.userName,
      email: payload.email,
      contactNumber: payload.contactNumber,
    },
  });

  console.log(createdNewFeedBack);

  if (!createdNewFeedBack) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback failed to add');
  }

  return createdNewFeedBack;
};

const getAllFeedBack = async (
  filters: IFeedBackFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FeedBackForm[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FeedBackSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (feedBackRelationalFields.includes(key)) {
          return {
            [feedBackRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.FeedBackFormWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.feedBackForm.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.feedBackForm.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateFeedBack = async (
  feedbackId: string,
  payload: Partial<IUpdateFeedBackRequest>
): Promise<FeedBackForm | null> => {
  const isExistFeedBack = await prisma.feedBackForm.findUnique({
    where: {
      feedbackId,
    },
  });

  if (!isExistFeedBack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FeedBack Not Found !!!');
  }

  const updateFeedback = {
    feedbackComment: payload?.feedbackComment,
    userName: payload?.userName,
    email: payload?.email,
    contactNumber: payload?.contactNumber,
  };

  const result = await prisma.feedBackForm.update({
    where: {
      feedbackId,
    },
    data: updateFeedback,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FeedBack Updating Failed !!!');
  }
  return result;
};

const SingleFeedbackDelete = async (
  feedbackId: string
): Promise<FeedBackForm | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    const isExistFeedBack = await transactionClient.feedBackForm.findUnique({
      where: {
        feedbackId,
      },
    });

    if (!isExistFeedBack) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feed Back Not Found');
    }

    const feedBackDeleted = await transactionClient.feedBackForm.delete({
      where: {
        feedbackId,
      },
    });

    return feedBackDeleted;
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feed Back Not Deleted');
  }
  return result;
};

export const FeedBackFormService = {
  createNewFeedBackForm,
  getAllFeedBack,
  SingleFeedbackDelete,
  updateFeedBack,
};
