import {ValidationError, validationResult} from 'express-validator'

export class DatabaseConnectionError extends Error{
  reason:string  = 'Error Connecting to D'
  constructor(reason:String )
  {
    super()
    //only beacuse we are extending built in class 
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    
  }
}

// throw new RequestValidationError(errors)
