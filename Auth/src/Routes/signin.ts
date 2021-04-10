import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../Errors/BadRequest';
import { RequestValidationError } from '../Errors/req-validation';
import  jwt  from "jsonwebtoken";
import { requestValidator } from '../middlewares/validate-request';
import {User} from '../Models/userModel'
import { Password } from '../Services/password';
const router = express.Router();
//SIGN IN ALGO

//EMAILPASS PROVIDED
//IF USER WITH EMAIL EXIST
//IF NOT THEN INVALID EMAI RESPONSE
//IF USER FIND COMPARE PASSWORD THROUGH PASSWORD CLASS
//IF ACCURATE THEN PROVIDE JWT TOKEN AS A COOKIE

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .notEmpty()
      .withMessage('Must provide a password'),
  ],
  requestValidator,
  async (request: Request, response: Response) => {
    const {email, password} = request.body
    
    
    
    const existingUser = await User.findOne({email})
    
    if(!existingUser){
      throw new BadRequestError('Something wrong with email or password1')
      
    }
    const passwordMatch = await Password.comparePassword(existingUser.password, password)
    console.log(passwordMatch);
    
    if(!passwordMatch){
      throw new BadRequestError('Something wrong with email or password')
    } 
    const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.jwt!) //process.env.jwt! here "!" mean hey ts, process.env.jwt is defined and we are 100% sure about that. if we dont put "!" it will show error
    //store it into session object 
    request.session = {
      jwt: userJwt
    }


    return response.status(201).json({
      status: 'successfuly login user',
      data: existingUser
    })

  }
);

export { router as signinRouter };
