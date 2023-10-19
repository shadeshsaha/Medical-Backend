import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IRequestUser } from '../users/users.interface';
import { blogFilterableFields } from './blogs.constants';
import { BlogService } from './blogs.service';

const createNewBlog = catchAsync(async (req: Request, res: Response) => {
  const profileId = (req.user as IRequestUser).profileId;
  const result = await BlogService.createNewBlog(profileId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created Successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BlogService.getAllBlogs(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Blogs fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.getSingleBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Blog data retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.updateBlog(blogId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await BlogService.deleteBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result?.blogTitle} Deleted successfully `,
  });
});

export const BlogsController = {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
