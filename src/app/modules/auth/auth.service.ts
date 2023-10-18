/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { userRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUserCreate } from './auth.interface';

// ! user create
const createNewUser = async (req: Request) => {
  const data = (await req.body) as IUserCreate;

  console.log('data', data);

  const { password, email } = data;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  // transaction start
  const newUser = await prisma.$transaction(async transactionClient => {
    const isUserExist = await transactionClient.user.findFirst({
      where: { email },
    });

    if (isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already in use');
    }

    const profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage!,
      role: data.role!,
    };

    const createdProfile = await transactionClient.profile.create({
      data: {
        ...profileData,
      },
      select: {
        profileId: true,
        role: true,
      },
    });

    console.log('specializationId', data.specializationId);

    if (createdProfile.role == userRole.DOCTOR) {
      await transactionClient.doctor.create({
        data: {
          qualification: data.qualification,
          specializationId: data.specializationId,
          profileId: createdProfile.profileId,
        },
        select: {
          profileId: true,
          createdAt: true,
        },
      });
    }

    const createdUser = await transactionClient.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          connect: {
            profileId: createdProfile.profileId,
          },
        },
      },
      select: {
        profileId: true,
        createdAt: true,
        email: true,
        userId: true,
        profile: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!createdUser || !createdProfile) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Creating New User Failed');
    }

    return createdUser;
  });

  return newUser;
};

export const AuthService = {
  createNewUser,
};
