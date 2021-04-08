import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import 'express-async-errors'; //USING THIS PACKAGE WE CAN DEAL WITH ASYNC ERRORS IN SYNC WAY WITHIUT USING NEXT MIDDLEWARE
import { currentUserRouter } from './Routes/current-user';
import { signinRouter } from './Routes/signin';
import { signoutRouter } from './Routes/signout';
import { signupRouter } from './Routes/signup';
import { errorHandler } from '../src/middlewares/error-handler';
import { NotFoundError } from './Errors/Not-Found-Error';

const app = express();
app.set('trust proxy', true)
app.use(
  express.json({
    limit: '10kb', //size of req.body can be upto 10kb
  })
); //BODY PARSER

//COOKIE SESSION SET
//COOKIE SESSION HAS THE ABILTY TO STORE MORE INFO IN IT WITHOUT USING ANY DB TO STORE
app.use(cookieSession({signed: false, secure: true, }));
//signed means cookie session is not encrypting. We are not encryoting cookie sessoin because her service 
//jo diffrent langauges may likhi hai sab may cookie session decrypt karnay ka tareeqa diffrent hai
//so sab ka decyption code likhna parayga
//without encyrption is not a big securty deal beacuse ager jwt halka sa bhi tamper hua tou
//sab jwt invalid hojayega and also we not adding password in jwt

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

//ROUTE MIDDLEWARE
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

//Route not Found
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

//GLOBAL ERROR HANDLE MIDDLEWARE
app.use(errorHandler);

//MONGO STARTUP
const mongoConnection = async () => {
  if(!process.env.jwt)
  {
    throw new Error('Jwt is not defined as env variable!!!')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to monogo instance succesfully....');
  } catch (error) {
    console.log(error);
  }
};

mongoConnection();

app.listen(3000, () => {
  console.log('Auth Running at port 3000');
});

//ASYNC ERRROS ARE THOSE ERRORS JO ASYNC HANDLER KAY ANDER HO
