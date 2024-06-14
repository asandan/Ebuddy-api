import { Request, Response } from "express";
import ApiError from "../entities/ApiError";
import { getFirestore } from "firebase-admin/firestore";

export const getUsers = async (_: Request, res: Response) => {

  const db = getFirestore();
  try {
    const userData = (await db.collection("user").get()).docs.map((doc) => doc.data());

    res.status(200).send(userData);
  } catch (e) {
    res.status(500).send(new ApiError(e.code, e.message));
  }
}

export const updateUsers = async (req: Request, res: Response) => {
  const db = getFirestore();

  try {
    const { id, data } = req.body;

    await db.collection("user").doc(id).update(data);

    res.status(200).send("User data updated successfully!");
  } catch (e) {
    res.status(500).send(new ApiError(e.code, e.message));
  }
};