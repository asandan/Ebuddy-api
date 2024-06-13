import * as admin from "firebase-admin";

import { db } from "../config/firebaseConfig";
import { DAY } from "../util/constants";
import { Request, Response } from "express";
import { authMiddleware } from "../middleware/middleware";

import { userRoute } from "../routes/userRoute";
import ApiError from "../entities/ApiError";

userRoute.post('/api/sessionLogin', async (req, res) => {
  const { idToken } = req.body;

  try {
    const expiresIn = DAY * 7;

    await admin.auth().verifyIdToken(idToken);
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
    res.cookie('session', sessionCookie, options);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating session cookie:', error);
    res.status(401).send(new ApiError(401, 'Unauthorized'));
  }
});

userRoute.get("/api/fetch-user-data", authMiddleware, async (_, res) => {
  try {
    const userData = (await db.collection("user").get()).docs.map((doc) => doc.data());

    res.status(200).send(userData);
  } catch (e) {
    res.status(500).send(new ApiError(e.code, e.message));
  }
})

userRoute.put("/api/update-user-data", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body;

    await db.collection("user").doc(id).update(data);

    res.status(200).send("User data updated successfully!");
  } catch (e) {
    res.status(500).send(new ApiError(e.code, e.message));
  }
});