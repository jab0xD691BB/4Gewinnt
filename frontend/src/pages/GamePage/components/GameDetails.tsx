import styled from "styled-components";
import React from "react";
import { GameRoom } from "../../NewgamePage/components/GameRoomList";

const GameDetailsLayout = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  width: 400px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  padding: 10px;
  height: 40%;
`;

const GameTitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid white;
`;

const GameDetailsWrapper = styled.div`
  direction: flex;
  flex-direction: column;
`;

const GameText = styled.p`
  display: inline-block;
  width: 50%;
  text-align: start;
`;
const GameTextValue = styled.p`
  display: inline-block;
  width: 50%;
  text-align: end;
`;

export const GameDetails: React.FC<{ gameDetails: GameRoom }> = ({
  gameDetails,
}) => {
  return (
    <GameDetailsLayout>
      <h2> Game Room Details </h2>
      <div style={{ overflowY: "auto", padding: "20px" }}>
        <GameTitle style={{ paddingTop: "10px" }}>{gameDetails.name}</GameTitle>
        <GameDetailsWrapper>
          <GameText>Player 1</GameText>
          <GameTextValue>{gameDetails.player1}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Player 2</GameText>
          <GameTextValue>{gameDetails.player2}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Guests</GameText>
          <GameTextValue>{gameDetails.guests}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Board Width</GameText>
          <GameTextValue>{gameDetails.gameSetting.boardWidth}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Board Heigth</GameText>
          <GameTextValue>{gameDetails.gameSetting.boardHeigth}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Row Counts To Win</GameText>
          <GameTextValue>{gameDetails.gameSetting.rowCountToWin}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Time</GameText>
          <GameTextValue>{gameDetails.gameSetting.time}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Game Mode</GameText>
          <GameTextValue>{gameDetails.gameSetting.gameMode}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Best Of</GameText>
          <GameTextValue>{gameDetails.gameSetting.bestOf}</GameTextValue>
        </GameDetailsWrapper>
        <GameDetailsWrapper>
          <GameText>Rated</GameText>
          <GameTextValue>{gameDetails.gameSetting.rated}</GameTextValue>
        </GameDetailsWrapper>
      </div>
    </GameDetailsLayout>
  );
};

export const GameDetailsEmpty: React.FC<{}> = () => {
  return (
    <GameDetailsLayout>
      <h2> Game Room Details </h2>
    </GameDetailsLayout>
  );
};
