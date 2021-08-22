import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { RequestError } from '../errors/RequestError';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    throw new RequestError('token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      'cf2312457bba63e1fba504f5df99671f30fce75d',
    );

    next();
  } catch {
    throw new RequestError('invalid token', 401);
  }
}
