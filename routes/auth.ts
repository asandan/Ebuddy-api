import { Router } from "express";
import { authorize } from "../controller/authController";

export const authRoute = Router();

authRoute.post('/session-login', authorize);
