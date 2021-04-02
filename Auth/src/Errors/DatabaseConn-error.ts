import {ValidationError, validationResult} from 'express-validator'

export class DatabaseConnectionError extends Error{
  statusCode = 500
  reason:string  = 'Error Connecting to Database'
  constructor(reason:String )
  {
    super()
    //only beacuse we are extending built in class 
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    
  }
  searalizeErrors()
  {
    return [{message: this.reason}]
  }

}

// throw new RequestValidationError(errors)
