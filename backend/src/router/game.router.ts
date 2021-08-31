import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  //getplayers,
} from "../controller/game.controller";

export const gameRouter = Router({ mergeParams: true });


gameRouter.get("/:id", getGame);
//gameRouter.get("/:playerid", getplayers);
gameRouter.post("/", createGame);
gameRouter.delete("/:id", deleteGame);
gameRouter.get("/", getAllGames);
