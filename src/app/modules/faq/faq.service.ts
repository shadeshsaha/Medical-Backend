import { Faq } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  ICreateNewFaqReq,
  ICreateReviewAndRatingResponse,
  IUpdateFaqReq,
} from './faq.interface';

const createNewFaq = async (
  profileId: string,
  payload: ICreateNewFaqReq
): Promise<ICreateReviewAndRatingResponse> => {
  const result = await prisma.faq.create({
    data: {
      faqTitle: payload.faqTitle,
      faqDescription: payload.faqDescription,
      profileId,
    },
    select: {
      faqTitle: true,
      faqDescription: true,
      createdAt: true,
      faqId: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faq creation failed ');
  }

  return result;
};

const getAllFaqs = async (): Promise<Faq[]> => {
  const result = await prisma.faq.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
  });

  return result;
};

const updateFaqDetails = async (
  faqId: string,
  updatedData: IUpdateFaqReq
): Promise<Faq> => {
  const existingFaq = await prisma.faq.findUnique({
    where: {
      faqId,
    },
  });

  if (!existingFaq) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faq not found');
  }

  if (Object.keys(updatedData).length === 0) {
    return existingFaq;
  }

  const result = await prisma.faq.update({
    where: {
      faqId,
    },
    data: updatedData,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faq update failed');
  }

  return result;
};

const deleteFaq = async (faqId: string): Promise<Faq> => {
  const isExistFaq = await prisma.faq.findUnique({
    where: {
      faqId,
    },
  });

  if (!isExistFaq) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faq not found');
  }

  const result = await prisma.faq.delete({
    where: {
      faqId,
    },
  });

  return result;
};

export const FaqService = {
  createNewFaq,
  getAllFaqs,
  updateFaqDetails,
  deleteFaq,
};
