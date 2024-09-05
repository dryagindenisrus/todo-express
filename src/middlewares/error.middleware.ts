import httpStatus from 'http-status';
import { ErrorRequestHandler, Request, Response } from 'express';
import { InvalidDataError } from '@/errors/InvalidDataError';
import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { DatabaseError } from '@/errors/DatabaseError';
import { UserAlreadyExistsError } from '@/errors/UserAlreadyExistsError';

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response) => {
  if (err instanceof UserAlreadyExistsError) {
    res.status(httpStatus.CONFLICT).send('User already exists');
  } else if (err instanceof DatabaseError) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  } else if (err instanceof UserNotFoundError) {
    res.status(httpStatus.NOT_FOUND).send(err.message);
  } else if (err instanceof InvalidDataError) {
    res.status(httpStatus.BAD_REQUEST).send(err.message);
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal server error');
  }
};
