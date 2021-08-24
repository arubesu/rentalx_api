import { Request, Response, NextFunction } from 'express';

import { RequestError } from '@errors/RequestError';

export async function exceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response> {
  if (err instanceof RequestError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
