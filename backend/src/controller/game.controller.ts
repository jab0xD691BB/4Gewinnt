import { getRepository } from "typeorm";
import { Game } from "../entity/game.model";
<<<<<<< HEAD
import { Player } from "../entity/player.model";
=======
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
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
<<<<<<< HEAD

  // Get games of one player
  export const getGamesOfPlayer = async (req: Request, res: Response) => {
    const playerid = req.params.playerid;
    const gameRepository = await getRepository(Game);
    const sqlQueryGame = `select * from game where id in (select gameId from game_players_player where playerId = "${playerid}") `;
    const playergames = await gameRepository.query(sqlQueryGame);
      res.send({ 
        data: playergames
      });
  };

  // Limit all games as Parameter
export const getSomeGames = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  const gameRepository = await getRepository(Game);
  const games = await gameRepository.createQueryBuilder("game").limit(limit).getMany();
  res.send({
    data: games,
  });
}


=======
  
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
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
<<<<<<< HEAD
  export const createGame = async (req: Request, res: Response) => {
    const {createdAt, winner, players} = req.body;
    const game = new Game();
    game.players = players;
    game.winner = winner;
=======
export const createGame = async (req: Request, res: Response) => {
    const {createdAt} = req.body;
    const game = new Game();
    game.createdAt = createdAt;
  
>>>>>>> a6bc9b62a73734ceffee1220f4933ecb5573ad1a
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