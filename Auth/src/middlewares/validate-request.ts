import {Request, Response, NextFunction} from 'express' 
import {validationResult} from 'express-validator'
import { RequestValidationError } from '../Errors/req-validation';
//we want to throw errors if request is not valid inside of this middleware
export const requestValidator  = (request:Request, reponse:Response, next:NextFunction) => {
 const errors = validationResult(request)
 if(!errors.isEmpty)
 {
   throw new RequestValidationError(errors.array())

 }
 next()
}