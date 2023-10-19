import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/users.interface';
import { FaqService } from './faq.service';

const createNewFaq = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  console.log(profileId, req.body);
  const result = await FaqService.createNewFaq(profileId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq created successfully!',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getAllFaqs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faq retrieved successfully!',
    data: result,
  });
});

const updateFaqDetails = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const updatedData = req.body;
  const result = await FaqService.updateFaqDetails(faqId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq Updated successfully!',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;
  const result = await FaqService.deleteFaq(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq Deleted successfully!',
    data: result,
  });
});

export const FaqController = {
  createNewFaq,
  getAllFaqs,
  updateFaqDetails,
  deleteFaq,
};
