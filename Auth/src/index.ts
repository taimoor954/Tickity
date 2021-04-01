import express from 'express'
import { currentUserRouter } from './Routes/current-user'
import { signinRouter } from './Routes/signin'
import { signoutRouter } from './Routes/signout'
import { signupRouter } from './Routes/signup'
const app = express()
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
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)


app.listen(3000, () => {
  console.log('Auth Running at port 3000');

})