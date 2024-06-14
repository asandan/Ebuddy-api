import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { DAY } from "../util/constants";
import ApiError from "../entities/ApiError";

export const authorize = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const expiresIn = DAY * 7;
    
    await admin.auth().verifyIdToken(idToken);
    
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
    
    res.cookie('session', sessionCookie, options);
    res.status(200).send({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    res.status(401).send(new ApiError(401, 'Unauthorized'));
  }
}