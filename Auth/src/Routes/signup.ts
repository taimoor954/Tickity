import express,{Request, Response} from 'express'
import {body} from 'express-validator'
const router = express.Router()



router.post('/api/users/signup',[body('email').isEmail().withMessage('Email must be valid'),
body('password').trim().isLength({min:4, max: 25}).withMessage('Password must be between 4 and 25 length')
], (request: Request, response: Response)=> {
  const {email,body} = request.body
  if(!email || typeof email !== "string")
  {
    response.status(400).send('Email is not valid')
  }

})

export {router as signupRouter}