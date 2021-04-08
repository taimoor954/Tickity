import express, { Request, Response } from 'express';
import { DatabaseConnectionError } from '../Errors/DatabaseConn-error';
import { RequestValidationError } from '../Errors/req-validation';
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator';
import { User } from '../Models/userModel';
import { BadRequestError } from '../Errors/BadRequest';
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

    const { email, password } = request.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {

      //Created my own bad request classs
      throw new BadRequestError('Email in use')
    }
    const user = User.build({ email, password })
    await user.save()
    //GENERATE JWT
    //tp store secret use kube8 to store it as a env variable
    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.jwt!) //process.env.jwt! here "!" mean hey ts, process.env.jwt is defined and we are 100% sure about that. if we dont put "!" it will show error
    //store it into session object 
    request.session = {
      jwt: userJwt
    }

    return response.status(201).json({
      status: 'successfuly created user',
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
