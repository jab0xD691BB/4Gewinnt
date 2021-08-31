import { RequestHandler, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Player } from "../entity/player.model";


//// CRUD Functions 
// Get all Players
export const getAllPlayers = async (req: Request, res: Response) => {
  const playerRepository = await getRepository(Player);
  const players =  await playerRepository.find() ;
  res.send({ 
    data: players
  });
};

// Get one Player
export const getPlayer = async (req: Request ,res: Response) => {
  const playerid = req.params.playerId;
  const playerRepository = await getRepository(Player);
  const player= await playerRepository.findOneOrFail(playerid);
  try {
    res.send({data:player});
  } catch (error) {
    res.status(404).send({status: 'Player not found'});
  }
};

// Update Player
export const updatePlayer = async (req: Request, res: Response) => {
  const playerid = req.params.playerId;
  const {name, password , email} = req.body;
  const playerRepository = await getRepository(Player);
  try {
    let player= await playerRepository.findOneOrFail(playerid);
    player.name = name;
    player.password = password;
    player.email = email;
    /* player.settings = settings;
    player.score = score; */

    player = await playerRepository.save(player);
    res.send({
      data:player
    });
  } catch (error) {
    res.status(404).send({
      status: 'Player not found'
    });
  }
};

// Create Player
export const createPlayer = async (req: Request, res: Response) => {
  const {name, password , email} = req.body;
  const player = new Player();
  player.name = name;
  player.password = password;
  player.email = email;
  /* player.settings = settings;
  player.score = score; */

  const playerRepository = await getRepository(Player);
  const createdPlayer = await playerRepository.save(player);

  res.send({
    data: createdPlayer,
  });
};

// Delete Player
export const deletePlayer = async (req: Request, res: Response) => {
  const playerid = req.params.playerId;
  const playerRepository = await getRepository(Player);
  try {
    const player= await playerRepository.findOneOrFail(playerid);
    await playerRepository.remove(player);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: 'PLayer not found'
    });
  }
};
