import { userRole } from '@prisma/client';

export type IUserCreate = {
  firstName: string;
  lastName: string;
  profileImage?: string | null | undefined;
  email: string;
  password: string;
  role: userRole;
  qualification: string;
  specializationId: string;
};
