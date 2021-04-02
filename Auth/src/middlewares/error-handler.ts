import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../Errors/CustomError-Abstract';

// import { DatabaseConnectionError } from '../Errors/DatabaseConn-error';
// import { RequestValidationError } from '../Errors/req-validation';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).send({ errors: err.searalizeErrors() });
  }
  // if (err instanceof DatabaseConnectionError) {
  //   console.log('Database Connection Error');
  //   return response.status(err.statusCode).send({ errors: err.searalizeErrors()});
  // }
  return response.status(400).send({
    message: 'Something went wrong',
  });
  next();
};
