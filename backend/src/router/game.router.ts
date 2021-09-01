import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGame,
<<<<<<< HEAD
  getGamesOfPlayer,
  getSomeGames,
=======
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
  //getplayers,
} from "../controller/game.controller";

export const gameRouter = Router({ mergeParams: true });


gameRouter.get("/:id", getGame);
<<<<<<< HEAD
gameRouter.get("/gamesplayedby/:playerid", getGamesOfPlayer);
gameRouter.get("/somegames", getSomeGames)
=======
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
//gameRouter.get("/:playerid", getplayers);
gameRouter.post("/", createGame);
gameRouter.delete("/:id", deleteGame);
gameRouter.get("/", getAllGames);
