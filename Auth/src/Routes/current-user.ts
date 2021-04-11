import express from 'express'
import jwt from "jsonwebtoken";
const router = express.Router()
router.get('/api/users/currentuser', (request, response)=> {
if(!request.session?.jwt) //check if request.session exist if yes then .jwt check karo 
{
  return response.status(200).json({
    currentUser : null
  })
}
//get payload from jwt 

try {
  const payload = jwt.verify(request.session.jwt, process.env.jwt!)
  response.status(200).json({
  currentUser:payload
  }) 
  
} catch (error) {
  response.status(400).json({
    currentUser : null, 
    error: error
  }) 

}

})

export {router as currentUserRouter}