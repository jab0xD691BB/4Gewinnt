import {Router} from 'express';
import { 
    loginPlayer, 
    registerPlayer,
    createPlayer,
    deletePlayer,
    getAllPlayers,
    getPlayer,
    updatePlayer,
} from '../controller/player.controller';


//Login & Register
export const playerRouter = Router({mergeParams: true });
playerRouter.post('/', registerPlayer);
playerRouter.post('/token', loginPlayer);

//Game
playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayer);
playerRouter.post("/", createPlayer);
playerRouter.delete("/:id", deletePlayer);
playerRouter.put("/:id", updatePlayer);


