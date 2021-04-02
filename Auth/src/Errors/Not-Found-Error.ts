import { CustomError } from './CustomError-Abstract';
export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super('Route not Found from class NotFoundError  ');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  searalizeErrors() {
    return [{ message: 'Route not Found' }];
  }
}
