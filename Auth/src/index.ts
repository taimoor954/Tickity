import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors'; //USING THIS PACKAGE WE CAN DEAL WITH ASYNC ERRORS IN SYNC WAY WITHIUT USING NEXT MIDDLEWARE
import { currentUserRouter } from './Routes/current-user';
import { signinRouter } from './Routes/signin';
import { signoutRouter } from './Routes/signout';
import { signupRouter } from './Routes/signup';
import { errorHandler } from '../src/middlewares/error-handler';
import { NotFoundError } from './Errors/Not-Found-Error';

const app = express();
app.use(
  express.json({
    limit: '10kb', //size of req.body can be upto 10kb
  })
); //BODY PARSER
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

mongoConnection()

app.listen(3000, () => {
  console.log('Auth Running at port 3000');
});

//ASYNC ERRROS ARE THOSE ERRORS JO ASYNC HANDLER KAY ANDER HO
