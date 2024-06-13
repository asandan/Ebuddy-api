import { NextFunction, Request, Response } from "express";
import * as admin from 'firebase-admin';
import ApiError from "../entities/ApiError";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionCookie = req.cookies.session || '';

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    if (!decodedClaims) throw new ApiError(401, 'Unauthorized');

    (req as any).user = decodedClaims;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message, code: error.code, authorized: false});
  }
};