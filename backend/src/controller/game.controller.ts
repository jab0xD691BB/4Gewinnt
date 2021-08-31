import { getRepository } from "typeorm";
import { Game } from "../entity/game.model";
import { RequestHandler, Request, Response } from "express";

//// CRUD Functions 

// Get all Games
export const getAllGames = async (req: Request, res: Response) => {
    const gameRepository = await getRepository(Game);
    const games =  await gameRepository.find() ;
    res.send({ 
      data: games
    });
  };
  
  // Get one Game
  export const getGame = async (req: Request ,res: Response) => {
    const gameid = req.params.gameId;
    const gameRepository = await getRepository(Game);
    const game = await gameRepository.findOneOrFail(gameid);
    try {
      res.send({data:game});
    } catch (error) {
      res.status(404).send({status: 'Game not found'});
    }
  };

  // Create Game
export const createGame = async (req: Request, res: Response) => {
    const {createdAt} = req.body;
    const game = new Game();
    game.createdAt = createdAt;
  
    const gameRepository = await getRepository(Game);
    const createdGame = await gameRepository.save(game);
  
    res.send({
      data: createdGame,
    });
  };
  
  // Delete Game
  export const deleteGame = async (req: Request, res: Response) => {
    const gameid = req.params.gameId;
    const gameRepository = await getRepository(Game);
    try {
      const game= await gameRepository.findOneOrFail(gameid);
      await gameRepository.remove(game);
      res.send({});
    } catch (error) {
      res.status(404).send({
        status: 'Game not found'
      });
    }
  };

  // get players playing in the game
  /* export const getplayers = async (req: Request, res: Response) => {
    const player = Number(req.query.player);
    const limit = Number(req.query.limit);
    const jokeRepository = await getRepository(Game);
    const jokes = await jokeRepository.createQueryBuilder("joke").where("joke.counter >= :counter", {counter: counter}).limit(limit).getMany();
    res.send({
      data: jokes,
    });
  }; */