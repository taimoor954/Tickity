import express from 'express'
import { currentUserRouter } from './Routes/current-user'
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


app.listen(3000, () => {
  console.log('Auth Running at port 3000');

})