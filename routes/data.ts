import { Router } from "express";
import { getData, getLabel } from "../controller/dataController";
import { middleware } from "../middleware/middleware";

export const dataRoute = Router();

dataRoute.get("/get-data", middleware, getData)

dataRoute.get("/get-label", getLabel)