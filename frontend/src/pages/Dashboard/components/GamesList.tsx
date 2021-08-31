import styled from "styled-components";
import { Player } from "./Leaderboard";
import React from "react";

export const PlayedGamesTitel = styled.p`
  text-align: center;
`;

export interface Game {
  player1: Player;
  player2: Player;
  date: string;
  gameStatus: string;
  moves: number;
}

const GamesPlayedWrapper = styled.div`
  height: 75%;
  margin-bottom: 7%;
  background-color: #2b2b2b;
  border-radius: 10px;
`;

const Titles = styled.div`
  display: flex;
  margin-bottom: 2px;
  border: 0px;
  background-color: #151515;
  font-size: 10px;
  padding: 0 2px 0 2px;
`;

const Title = styled.p`
  display: inline-block;
  width: 25%;
  text-align: center;
`;

const GameWrapper = styled.div`
  height: 10%;
  width: 100%;
  border-bottom: 1px solid #202020;
  display: flex;
  font-size: 0.8rem;
  margin: 4px 0 4px 0;
`;

const PlayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  line-height: 25px;
`;

const PlayerStyle = styled.p`
  display: inline-block;
  margin: 0;
  text-align: center;
`;

const GameText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  text-align: center;
`;

export const GamesList: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <GamesPlayedWrapper>
      <PlayedGamesTitel>Played Games</PlayedGamesTitel>
      <Titles>
        <Title>Players</Title>
        <Title>Result</Title>
        <Title>Moves</Title>
        <Title>Date</Title>
      </Titles>
      {games.map((game) => {
        return (
          <GameWrapper>
            <PlayersWrapper>
              <PlayerStyle>
                {game.player1.name + " (" + game.player1.elo + ")"}
              </PlayerStyle>
              <PlayerStyle>
                {game.player2.name + " (" + game.player2.elo + ")"}
              </PlayerStyle>
            </PlayersWrapper>
            <GameText>{game.gameStatus}</GameText>
            <GameText>{game.moves}</GameText>
            <GameText>{game.date}</GameText>
          </GameWrapper>
        );
      })}
    </GamesPlayedWrapper>
  );
};
