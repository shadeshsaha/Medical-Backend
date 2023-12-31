/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  IBlogCreateRequest,
  IBlogFilterRequest,
  ICreateNewBlogResponse,
} from './blogs.interface';

import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { Blog, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  blogRelationalFields,
  blogRelationalFieldsMapper,
  blogSearchableFields,
} from './blogs.constants';

// modules

const createNewBlog = async (
  profileId: string,
  data: IBlogCreateRequest
): Promise<ICreateNewBlogResponse> => {
 

  const result = await prisma.$transaction(async transactionClient => {
    const createdBlog = await transactionClient.blog.create({
      data: {
        blogTitle: data.blogTitle,
        blogDescription: data.blogDescription,
        blogImage: data.blogImage,
        profileId,
      },
      select: {
        blogId: true,
        blogTitle: true,
        createdAt: true,
      },
    });
    return createdBlog;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog creation failed');
  }
  return result;
};

const getAllBlogs = async (
  filters: IBlogFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map((field: any) => ({
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
        if (blogRelationalFields.includes(key)) {
          return {
            [blogRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
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
  const total = await prisma.blog.count({
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

const getSingleBlog = async (blogId: string): Promise<Blog | null> => {
  //

  const result = await prisma.blog.findUnique({
    where: {
      blogId,
    },
    include: {
      profile: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog Not Found !!!');
  }
  return result;
};

// update
const updateBlogDetails = async (
  blogId: string,
  updatedData: IBlogCreateRequest
): Promise<Blog> => {
  const existingBlog = await prisma.blog.findUnique({
    where: {
      blogId,
    },
  });

  if (!existingBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  if (Object.keys(updatedData).length === 0) {
    return existingBlog;
  }

  const result = await prisma.blog.update({
    where: {
      blogId,
    },
    data: updatedData,
  });

  return result;
};

// delete
const deleteBlog = async (blogId: string): Promise<Blog> => {
  //
  const isExistBlog = await prisma.blog.findUnique({
    where: {
      blogId,
    },
  });

  if (!isExistBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  const result = await prisma.blog.delete({
    where: {
      blogId,
    },
  });

  return result;
};

export const BlogService = {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlogDetails,
  deleteBlog,
};
