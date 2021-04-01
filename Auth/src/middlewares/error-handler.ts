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
{
  
  console.log('Request Validation Error');
  const formmattedErrors = err.errors.map(error=>{
    return {message:error.msg, field: error.param}
  })
  return response.status(400).send({errors: formmattedErrors})
}
  if (err instanceof DatabaseConnectionError)
{   
  
  console.log('Database Connection Error');
  return response.status(400).send({errors: [{message: err.reason}]})



}
  return response.status(400).send({
    message: 'Something went wrong'
  })
  next();
};
