/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request } from 'express';

import { IUserCreate } from './auth.interface';

// ! user create
const createNewUser = async (req: Request) => {
  const data = (await req.body) as IUserCreate;
  console.log('data: ', data);
  return data;
};

export const AuthService = {
  createNewUser,
};
