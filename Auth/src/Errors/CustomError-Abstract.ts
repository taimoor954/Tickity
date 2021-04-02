//The reason of implmenting a CustomAbstarct Class is kay Apki class may 2 cheezen must honu chiaya
//abstract class and searalizeErrors and jo searalizeErrors return kar  raha hai wo match karay
// can also create inference if you want to isntead of abs class

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message:string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract searalizeErrors(): { message: string; field?: string }[];
}
