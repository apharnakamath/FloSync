import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js'; 

const router = express.Router();

// POST route for user signup
router.post('/signup', registerUser);

// POST route for user login
router.post('/login', loginUser);

export default router;

