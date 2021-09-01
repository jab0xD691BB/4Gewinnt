<<<<<<< HEAD
import {Router} from 'express';
import { 
    loginPlayer, 
    registerPlayer,
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer,
    sorted,
} from '../controller/player.controller';


//Login & Register

export const playerRouter = Router({mergeParams: true });

playerRouter.post('/', registerPlayer);
playerRouter.post('/token', loginPlayer);


//Game
playerRouter.get("/sortplayers",sorted)
playerRouter.put("/:playerId", updatePlayer);
playerRouter.get("/:playerId", getPlayer);
playerRouter.post("/", createPlayer);
playerRouter.delete("/:playerId", deletePlayer);
playerRouter.get("/", getAllPlayers);
=======
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
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
