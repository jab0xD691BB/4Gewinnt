import styled from "styled-components";
import { theme } from "../../theme";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  advanceButtonClicked,
  game,
  GameBoard,
  GameBoardWrapper,
  resign,
  reverseButtonClicked,
} from "./components/GameBoard";

import {
  ArrowLeftButton,
  ArrowRightButton,
  ReplayButtonWrapper,
  ReplayButtonWrapperSingle,
} from "./components/ReplayButtons";

import {
  GameHeaderWrapper,
  GameHeaderWrapperSingle,
} from "./components/GameHeader";

import { GameRoom, GameRoomItem } from "../NewgamePage/components/GameRoomList";
import { GameDetails } from "./components/GameDetails";
import { Button, VerticalButtonWrapper } from "./components/Button";
import { SocketContext } from "../../context/socket.context";
import { GameoverPopup } from "./components/GameoverPopup";

const GameBody = styled.div`
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

const gameRoom: GameRoom = {
  id: "1",
  name: "Test Room Name1",
  player1: "IchMachDichPlatt",
  player2: "IchDichAuch",
  guests: ["Gast1", "Gast2"],
  gameSetting: {
    boardWidth: "7",
    boardHeigth: "7",
    bestOf: "7",
    gameMode: "human",
    rated: "on",
    rowCountToWin: "4",
    time: "7",
  },
};

export const GamePage = () => {
  const [stepCounterRerender, setStepCounterRerenderer] = useState(0);
  const { socket, rooms, joinedRoom } = useContext(SocketContext);

  console.log("log from Gamepage", joinedRoom);

  const rerenderStepCounter = function () {
    setStepCounterRerenderer(
      game.activeStep === undefined
        ? game.gameSteps.length - 1
        : game.activeStep
    );
  };

  useEffect(() => {
    console.log("games", rooms);
  }, []);

  return (
    <Layout>
      <GameoverPopup></GameoverPopup>
      <GameBody>
        <div style={{ display: "flex", flexDirection: "row", height: "800px" }}>
          <div style={{ width: "70%", height: "100%" }}>
            <GameHeaderWrapper>
              <GameHeaderWrapperSingle>
                {joinedRoom !== null ? joinedRoom.player1 : ""}
              </GameHeaderWrapperSingle>
              <GameHeaderWrapperSingle>VS</GameHeaderWrapperSingle>
              <GameHeaderWrapperSingle>
                {joinedRoom !== null ? joinedRoom.player2 : ""}
              </GameHeaderWrapperSingle>
            </GameHeaderWrapper>
            <GameBoardWrapper onClick={rerenderStepCounter}>
              <GameBoard />
            </GameBoardWrapper>
            <ReplayButtonWrapper onClick={rerenderStepCounter}>
              <div style={{ width: "30%" }}>
                <h3>Back</h3>
              </div>
              <ReplayButtonWrapperSingle onClick={reverseButtonClicked}>
                <ArrowLeftButton></ArrowLeftButton>
              </ReplayButtonWrapperSingle>
              <ReplayButtonWrapperSingle>
                {stepCounterRerender}
              </ReplayButtonWrapperSingle>
              <ReplayButtonWrapperSingle onClick={advanceButtonClicked}>
                <ArrowRightButton></ArrowRightButton>
              </ReplayButtonWrapperSingle>
              <div style={{ width: "30%", textAlign: "end" }}>
                <h3>Forth</h3>
              </div>
            </ReplayButtonWrapper>
          </div>
          <div>
            <GameDetails
              gameDetails={joinedRoom !== null ? joinedRoom : gameRoom}
            />
            <VerticalButtonWrapper>
              <Button onClick={resign}>Resign</Button>
              <Button>Back to Dashboard</Button>
            </VerticalButtonWrapper>
          </div>
        </div>
      </GameBody>
    </Layout>
  );
};
