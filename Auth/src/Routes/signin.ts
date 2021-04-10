import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../Errors/req-validation';
import { requestValidator } from '../middlewares/validate-request';

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
  (request: Request, response: Response) => {
    
    response.send('hi there from sign in');
  }
);

export { router as signinRouter };
