import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  //this is how we goes into existing type definiton and make modifincation to it
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session?.jwt) {
    //check if request.session exist if yes then .jwt check karo
    return next();
  }

  try {
    const payload = jwt.verify(
      request.session.jwt,
      process.env.jwt!
    ) as UserPayload;
    request.currentUser = payload; //request.currentUser error dega because request.currentUser koi property nahi hai by default. For this purpose we use global above to make changes in exsting Request typescript inteface
  } catch (error) {
    response.status(400).json({
      currentUser: null,
      error: error,
    });

  }
  next();

};
