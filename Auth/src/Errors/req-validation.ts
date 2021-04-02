import {ValidationError, validationResult} from 'express-validator'

export class RequestValidationError extends Error{
  statusCode = 400
  constructor(public errors:ValidationError[] )
  {
    super()
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
