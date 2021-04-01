import express, { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../Errors/DatabaseConn-error';
import { RequestValidationError } from '../Errors/req-validation';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError)
    console.log('Request Validation Error');
  if (err instanceof DatabaseConnectionError)
    console.log('Database Connection Error');

  return response.status(400).json({
    status: 'Failed',
    message: err.message,
  });
  next();
};
