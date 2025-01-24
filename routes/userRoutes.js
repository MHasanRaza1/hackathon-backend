import express from 'express';
import { getUsers, loginUser, logoutUser, registerUser } from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.get('/',getUsers);
userRoutes.post('/register',registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/logout',logoutUser);

export default userRoutes;