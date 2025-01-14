
import { createUser,showUsers }  from "../controllers/user.controller.js";

import express from 'express';
// user.routes.js
import authMiddleware from "../middleware/auth.js";

//2. configurar el router

export const userRouter = express.Router();

userRouter.post('/crear', createUser);
userRouter.get('/obtener', showUsers);
// userRouter.get('/obtener', authMiddleware, showUsers);

