import {getRepository} from "typeorm";
import {Game} from "../entity/game.model";
import {Player} from "../entity/player.model";
import {RequestHandler, Request, Response} from "express";

//// CRUD Functions 

// Get all Games
export const getAllGames = async (req: Request, res: Response) => {
    const gameRepository = await getRepository(Game);
    const games = await gameRepository.find();
    res.send({
        data: games
    });
};

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


// Get one Game
export const getGame = async (req: Request, res: Response) => {
    const gameid = req.params.gameId;
    const gameRepository = await getRepository(Game);
    const game = await gameRepository.findOneOrFail(gameid);
    try {
        res.send({data: game});
    } catch (error) {
        res.status(404).send({status: 'Game not found'});
    }
};

// Create Game
export const createGame = async (req: Request, res: Response) => {
    const {createdAt, winner, players, settings, moves} = req.body;

    const game = new Game();
    game.players = players;
    game.winner = winner;

    if (game.players.length == 2) {

        const eloArray = await updateRatings(game.players[0], game.players[1], game.winner);
        if(eloArray){
            game.players[0].eloScore = eloArray[0];
            game.players[1].eloScore = eloArray[1];
        }
    }

//    game.settings = settings;
//    game.moves = moves;
    const gameRepository = await getRepository(Game);
    const createdGame = await gameRepository.save(game);

    res.send({
        data: createdGame,
    });
};

const updateRatings = async (player1byCreateGame: Player, player2byCreateGame: Player, winner: Player) => {

    try {
        const Elo = require('elo-calculator');
        const elo = new Elo({
            // The rating of which each initialized player will start with
            rating: 1200,
            // The coefficient, called the K-factor, is the maximum possible adjustment per game.
            // Which value is used depends on one or more the following points:
            // 1. The number of games the player has played
            // 2. The current rating of the player
            // 3. The highest rating the player has ever had.
            // Weak and new players generally have a higher coefficient than stronger, more experienced players.
            // The conditions used to apply a k-factor are based the ones used by the World Chess Federation (http://www.fide.com/fide/handbook.html?id=172&view=article)
            k: [40, 20, 10]
        });

        const playerRepository = getRepository(Player);

        const player1 = await playerRepository.findOneOrFail(player1byCreateGame.id);
        const player2 = await playerRepository.findOneOrFail(player2byCreateGame.id);


        const gameRepository = getRepository(Game);
        const player1GamesQuery = `select count(*) from game where id in (select gameId from game_players_player where playerId = "${player1.id}") `;
        const player1Games = await gameRepository.query(player1GamesQuery);

        const player2GamesQuery = `select count(*) from game where id in (select gameId from game_players_player where playerId = "${player2.id}") `;
        const player2Games = await gameRepository.query(player2GamesQuery);

        const ratingPlayer1 = elo.createPlayer(player1.eloScore, player1Games);
        const ratingPlayer2 = elo.createPlayer(player2.eloScore, player2Games);

        if (!winner.id) {
            elo.updateRatings([
                [ratingPlayer1, ratingPlayer2, .5],
            ]);
        } else if (player1byCreateGame.id == winner.id) {
            elo.updateRatings([
                [ratingPlayer1, ratingPlayer2, 1],
                [ratingPlayer2, ratingPlayer1, 0]
            ]);
        } else if (player2byCreateGame.id == winner.id) {
            elo.updateRatings([
                [ratingPlayer1, ratingPlayer2, 0],
                [ratingPlayer2, ratingPlayer1, 1]
            ]);
        }

        player1.eloScore = Math.round(ratingPlayer1.rating);
        player2.eloScore = Math.round(ratingPlayer2.rating);

        console.log("player1 elo: ", ratingPlayer1.rating);
        console.log("player2 elo: ", ratingPlayer2.rating);


        await playerRepository.save(player1);
        await playerRepository.save(player2);

        let eloArray = new Array<number>();
        eloArray.push(player1.eloScore);
        eloArray.push(player2.eloScore);

        return eloArray;

    } catch (e) {
        console.log("update ratings failure: ", e);
    }
}


// Delete Game
export const deleteGame = async (req: Request, res: Response) => {
    const gameid = req.params.gameId;
    const gameRepository = await getRepository(Game);
    try {
        const game = await gameRepository.findOneOrFail(gameid);
        await gameRepository.remove(game);
        res.send({});
    } catch (error) {
        res.status(404).send({
            status: 'Game not found'
        });
    }
};

// get players playing in the game
export const getplayersfromgame = async (req: Request, res: Response) => {
    const gameid = req.params.gameId;
    const gameRepository = await getRepository(Game);
    const sqlQueryGame = `select * from player where id in (select playerId from game_players_player where gameId = "${gameid}") `;
    const games = await gameRepository.query(sqlQueryGame);
    res.send({
        data: games,
    });
};