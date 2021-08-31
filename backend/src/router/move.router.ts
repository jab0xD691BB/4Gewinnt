import { Router } from "express";
import {
  createMove,
  getAllMoves,
  getMove,
} from "../controller/move.controller";

export const moveRouter = Router({ mergeParams: true });

moveRouter.get("/", getAllMoves);
moveRouter.get("/:id", getMove);
moveRouter.post("/", createMove);
