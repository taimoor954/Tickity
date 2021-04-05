import express, { Request, Response } from 'express';
import { DatabaseConnectionError } from '../Errors/DatabaseConn-error';
import { RequestValidationError } from '../Errors/req-validation';

import { body, validationResult } from 'express-validator';
import { User } from '../Models/userModel';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 25 })
      .withMessage('Password must be between 4 and 25 length'),
  ],
  async (request: Request, response: Response) => {
    //DOES USER EXIST
    //IF NOT THEN HASH PASSWORD
    //CREATE A NEW USER AND SAVE THEM TO MONGODB
    //USER IS NOW CONSIDER TO BE LOGGED IN. SEND THEM JWT TOKEN OR STH LIKE THAT
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());

      // return response.status(400).send(errors.array());
    }
    
    const {email, password} = request.body
    const existingUser = await User.findOne({email})
    if(existingUser)
    {
      console.log('User exist with this email id');
      return response.status(400).json({
        status:'failed',
        message:"User exist with this email id"
      })
    }
    const user = User.build({email, password})
    await user.save()
    return response.status(201).json({
      status:'successfuly created user',
      data: user
    })
     
    
  
    // console.log('Creating a user.....');
    // throw new DatabaseConnectionError('Error connecting to DB');

    // response.status(201).json({
    //   status: 'Succesfully user created',
    // });
  }
);

export { router as signupRouter };
