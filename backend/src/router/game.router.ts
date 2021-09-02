import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
  getGamesOfPlayer,
  getSomeGames,
  getplayersfromgame,
} from "../controller/game.controller";

export const gameRouter = Router({ mergeParams: true });


gameRouter.get("/:id", getGame);
gameRouter.get("/gamesplayedby/:playerid", getGamesOfPlayer);
gameRouter.get("/somegames", getSomeGames)
gameRouter.get("/players/:gameId", getplayersfromgame);
gameRouter.post("/", createGame);
gameRouter.delete("/:id", deleteGame);
gameRouter.get("/", getAllGames);
