import { CustomError } from './CustomError-Abstract';

export class NotAuthorizeError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Not authorized');
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }
  searalizeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
