import {ValidationError, validationResult} from 'express-validator'

export class RequestValidationError extends Error{
  constructor(public errors:ValidationError[] )
  {
    super()
    //only beacuse we are extending built in class 
    Object.setPrototypeOf(this, RequestValidationError.prototype)
    
  }
}

// throw new RequestValidationError(errors)
