/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { userRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUserCreate,
  IUserLogin,
} from './auth.interface';

// Create User
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

// Login
const userLogin = async (
  loginData: IUserLogin
): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      userId: true,
      password: true,
      email: true,
      profile: {
        select: {
          role: true,
          profileId: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found !!');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist?.password);

  if (isUserExist && !isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect !!');
  }

  type TokenData = {
    userId: string;
    role: userRole;
    profileId: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  const tokenData: TokenData = {
    userId: isUserExist.userId,
    role: isUserExist?.profile?.role!,
    profileId: isUserExist.profile?.profileId!,
    email: isUserExist.email,
    firstName: isUserExist.profile?.firstName!,
    lastName: isUserExist.profile?.lastName!,
  };

  const accessToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// Refresh-Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // If user does not exist, check deleted user's refresh token
  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({
    where: {
      userId,
    },
    select: {
      userId: true,
      password: true,
      profile: {
        select: {
          role: true,
          profileId: true,
        },
      },
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!!');
  }

  type TokenData = {
    userId: string;
    role: userRole;
    profileId: string;
  };

  const tokenData: TokenData = {
    userId: isUserExist.userId,
    role: isUserExist?.profile?.role!,
    profileId: isUserExist?.profile?.profileId!,
  };

  // Generate new token
  const newAccessToken = jwtHelpers.createToken(
    tokenData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createNewUser,
  userLogin,
  refreshToken,
};
