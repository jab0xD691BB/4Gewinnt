import { Router } from "express";
import {
  createMove,
  getAllMoves,
  getMove,
} from "../controller/move.controller";

export const moveRouter = Router({ mergeParams: true });

<<<<<<< HEAD
moveRouter.get("/:id", getAllMoves);
=======
moveRouter.get("/", getAllMoves);
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
moveRouter.get("/:id", getMove);
moveRouter.post("/", createMove);
