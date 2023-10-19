import { z } from 'zod';

const createBlog = z.object({
  blogTitle: z.string({
    required_error: 'Blog Title is Required',
    invalid_type_error: 'Blog Title must be in String',
  }),
  blogDescription: z.string({
    required_error: 'Blog Description is Required',
    invalid_type_error: 'Blog Description must be in String',
  }),
  blogImage: z.string({
    required_error: 'Blog Image is Required',
    invalid_type_error: 'Blog Image must be in String',
  }),
  profileId: z.string({
    required_error: 'Profile ID is Required',
    invalid_type_error: 'Profile ID must be in String',
  }),
});

const updateBlog = z.object({
  blogTitle: z
    .string({
      required_error: 'Blog Title is Required',
      invalid_type_error: 'Blog Title must be in String',
    })
    .optional(),
  blogDescription: z
    .string({
      required_error: 'Blog Description is Required',
      invalid_type_error: 'Blog Description must be in String',
    })
    .optional(),
  blogImage: z
    .string({
      required_error: 'Blog Image is Required',
      invalid_type_error: 'Blog Image must be in String',
    })
    .optional(),
  profileId: z
    .string({
      required_error: 'Profile ID is Required',
      invalid_type_error: 'Profile ID must be in String',
    })
    .optional(),
});

export const BlogValidation = {
  createBlog,
  updateBlog,
};
