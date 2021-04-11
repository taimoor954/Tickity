import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
const router = express.Router();
router.get('/api/users/currentuser', currentUser, (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: request.currentUser || null, //if no user is signed in then send null
  });
});

export { router as currentUserRouter };
