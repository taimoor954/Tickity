import express, { Request, Response } from 'express';
import {DatabaseConnectionError} from '../Errors/DatabaseConn-error'
import {RequestValidationError} from '../Errors/req-validation'

import { body, validationResult } from 'express-validator';
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
  (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())   
   
      // return response.status(400).send(errors.array());
    
    }
    console.log('Creating a user.....');
    throw new DatabaseConnectionError('Error connecting to DB')   

    response.status(201).json({
      status : "Succesfully user created"
    })
  }
);

export { router as signupRouter };
