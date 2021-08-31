import { Router } from "express";
import {
  createPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayer,
  updatePlayer,
} from "../controller/player.controller";

export const playerRouter = Router({ mergeParams: true });

playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayer);
playerRouter.post("/", createPlayer);
playerRouter.delete("/:id", deletePlayer);
playerRouter.put("/:id", updatePlayer);
