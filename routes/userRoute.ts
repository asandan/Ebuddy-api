import { Router } from 'express';
import { middleware } from '../middleware/middleware';
import { getUsers, updateUsers } from '../controller/userController';

export const userRoute = Router();

userRoute.get("/fetch-user-data", getUsers)

userRoute.put("/update-user-data", middleware, updateUsers);