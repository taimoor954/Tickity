import express, { Request, Response, NextFunction } from 'express';

export const errorHandler = (err:Error, request: Request, response:Response, next:NextFunction) => {
console.log('Sth Went wrong:', err);

return response.status(400).json({
  status : "Failed",
  message : err.message,
  


})
next()
}