import { NextFunction, Request, Response } from 'express';

import { RequestError } from '@errors/RequestError';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

export async function ensureUserIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new RequestError('This user is not a administrator');
  }

  return next();
}
