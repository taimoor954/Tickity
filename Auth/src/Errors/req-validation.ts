import {ValidationError, validationResult} from 'express-validator'
import {CustomError} from './CustomError-Abstract'

export class RequestValidationError extends CustomError{
  statusCode = 400
  constructor(public errors:ValidationError[] )
  {
    super("Invalid request from RequestValidationError Error Class for Logging Purpose")
    //only beacuse we are extending built in class 
    Object.setPrototypeOf(this, RequestValidationError.prototype)
    
  }
  searalizeErrors(){
    return this.errors.map(err=> {
      return {message: err.msg, field: err.param}
    })
  }


}

// throw new RequestValidationError(errors)
