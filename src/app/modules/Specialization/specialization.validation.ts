import { z } from 'zod';

const createSpecialization = z.object({
  specializationName: z.string({
    invalid_type_error: 'Specialization Name must be in String',
    required_error: 'Specialization Name is Required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be in String',
    required_error: 'Description is Required',
  }),
});

const updateSpecialization = z.object({
  body: z.object({
    specializationName: z
      .string({
        invalid_type_error: 'Specialization Name must be in String',
        required_error: 'Specialization Name is Required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be in String',
        required_error: 'Description is Required',
      })
      .optional(),
  }),
});

export const StylesValidation = {
  createSpecialization,
  updateSpecialization,
};
