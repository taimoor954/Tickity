import {scrypt, randomBytes} from 'crypto'
import {promisify} from 'util'

//using promisify because scrypt is call back based and using promisify make it promise based
const scryptAsync = promisify(scrypt)
export class Password{
//STATIC CAN BE ACCESSED DIRECTLY WITH CLASS NAME Password.comparePassword. No need pf creating imstance
  static async hashPassword(password:string)
  {
    const salt = randomBytes(8).toString('hex')
     const buffer = (await scryptAsync(password, salt , 64)) as Buffer
     return `${buffer.toString('hex')}.${salt}}`
  }

  static comparePassword(storedPassword:string, supppliedPassword: string)
  {

  }


}
