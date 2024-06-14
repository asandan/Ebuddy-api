import { Request, Response } from "express";
import ApiError from "../entities/ApiError";

export const getData = async (_: Request, res: Response) => {
  try {
    res.status(200).send("Data from the backend!");
  } catch (e) {
    res.status(500).send(new ApiError(500, "Error fetching data!"));
  }
}

export const getLabel = async (_: Request, res: Response) => {
  try {
    res.status(200).send({ label: "Label from the backend! 🗄️" });
  } catch (e) {
    res.status(500).send(new ApiError(500, "Error fetching data!"));
  }
}