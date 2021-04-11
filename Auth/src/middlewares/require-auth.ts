//work as protecred middleware to check if user can access the rout onoly if he is log in
import express, { Request, Response, NextFunction } from 'express';
import { NotAuthorizeError } from '../Errors/Not-Authorize-error';

export const requireAuth = (request: Request,
  response: Response,
  next: NextFunction) => {
  //user access route if they do not have access to  it
  if (!request.currentUser) {
    throw new NotAuthorizeError();
  }
  next()

};
