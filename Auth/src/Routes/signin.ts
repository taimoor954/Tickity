import express from 'express'
const router = express.Router()
router.post('/api/users/signin', (request, response)=> {
response.send('hi there from sign in')
})

export {router as signinRouter}