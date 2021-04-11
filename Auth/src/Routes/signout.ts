import express from 'express'
const router = express.Router()
router.post('/api/users/signout', (request, response)=> {
request.session = null
response.status(200).json({
  status: "Successfully log out"
})

})

export {router as signoutRouter}