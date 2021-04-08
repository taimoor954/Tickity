import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

//using promisify because scrypt is call back based and using promisify make it promise based
const scryptAsync = promisify(scrypt);
export class Password {
  //STATIC CAN BE ACCESSED DIRECTLY WITH CLASS NAME Password.comparePassword. No need pf creating imstance
  //HASH PASSWORD USE FOR SIGN IN TO CHECK IF VALID PASSWORD IS PROVIDED

  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    //CONCATENATE SALT AND BUFFER STRING TOGETHER AND RETURN THEM
    return `${buffer.toString('hex')}.${salt}`;
  }

  //COMPARE PASSWORD USE FOR SIGN IN TO CHECK IF VALID PASSWORD IS PROVIDED
  static async comparePassword(
    storedPassword: string,
    supppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(supppliedPassword, salt, 64)) as Buffer;
    return buffer.toString('hex') === hashedPassword;
  }
}
