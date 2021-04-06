import {CustomError} from './CustomError-Abstract'

export class BadRequestError extends CustomError{
statusCode = 400
constructor(public message: string ){
super(message)
Object.setPrototypeOf(this, BadRequestError.prototype)
}
searalizeErrors()
{
return [{message:this.message}]
}
}