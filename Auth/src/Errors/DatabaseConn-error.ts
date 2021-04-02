import {CustomError} from './CustomError-Abstract'
import {ValidationError, validationResult} from 'express-validator'


export class DatabaseConnectionError extends CustomError{
  statusCode = 500
  reason:string  = 'Error Connecting to Database'
  constructor(reason:String )
  {
    super('Error Connecting to Database from class DatabaseConnectionError for Logging Purpose')
    //only beacuse we are extending built in class 
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    
  }
  searalizeErrors()
  {
    return [{message: this.reason}]
  }

}

// throw new RequestValidationError(errors)
