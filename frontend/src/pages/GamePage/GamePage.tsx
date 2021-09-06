import styled from "styled-components";
import { theme } from "../../theme";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { useContext, useState } from "react";
import {
  advanceButtonClicked,
  GameBoard,
  GameBoardWrapper,
  resign,
  reverseButtonClicked,
  toLastStep,
} from "./components/GameBoard";

import {
  ArrowLeftButton,
  ArrowRightButton,
  ArrowRightDangerButton,
  ReplayButtonWrapper,
  ReplayButtonWrapperSingle,
} from "./components/ReplayButtons";

import {
  GameHeaderWrapper,
  PlayerNameWrapperActive,
  PlayerNameWrapperInactive,
} from "./components/GameHeader";

import { GameRoom } from "../NewgamePage/components/GameRoomList";
import { GameDetails } from "./components/GameDetails";
import { Button, VerticalButtonWrapper } from "./components/Button";
import { SocketContext } from "../../context/socket.context";
import { ReadyCheck } from "./components/ReadyCheck";

import { Game, GameStateEnum } from "./components/GameEngine";
import { Chat } from "./components/Chat";
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
    rated: "on",
    rowCountToWin: "4",
    time: "7",
  },
};

export var game: Game;

export const GamePage = () => {
  const [stepCounterRerender, setStepCounterRerenderer] = useState(0);
  const { socket, rooms, gameState, joinedRoom } = useContext(SocketContext);
  const socketContext = useContext(SocketContext);

  if (
    socketContext.joinedRoom &&
    socketContext.joinedRoom?.player1 != "" &&
    (!game || game.gameState == GameStateEnum.SUSPENDED)
  ) {
    console.log("CREATE NEW GAME");
    game = new Game(
      Number(socketContext.joinedRoom?.gameSetting.boardWidth),
      Number(socketContext.joinedRoom?.gameSetting.boardHeigth),
      Number(socketContext.joinedRoom?.gameSetting.rowCountToWin)
    );

    game.addPlayer(
      socketContext.joinedRoom?.player1,
      socketContext.joinedRoom?.player1,
      theme.colors.player1Color,
      Number(socketContext.joinedRoom?.gameSetting.time)
    );

    //dummy

    if (socketContext.joinedRoom && socketContext.joinedRoom?.player2 != "") {
      //      if (socketContext.gameState) game.setGame(socketContext.gameState);
      game.addPlayer(
        socketContext.joinedRoom?.player2,
        socketContext.joinedRoom?.player2,
        theme.colors.player2Color,
        Number(socketContext.joinedRoom?.gameSetting.time)
      );
      game.startGame();
      game.cyclePlayer();
      let gameStateWrapper = {
        gameState: game.getGameState,
        playerValuesAsArray: game.players,
        playerIdsAsArray: game.playerIds,
      };
      socketContext.socket.emit("refreshGameState", gameStateWrapper);
      socketContext.socket.emit("message", {
        name: "System",
        message: "Player joined ... Game Started ... GL HF",
      });
      //      socketContext.setGameStateFromGameBoard(game.getGameState);
    } else {
      socketContext.socket.emit("message", {
        name: "System",
        message: "Waiting for opponent...",
      });
    }
  }

  const rerenderStepCounter = function () {
    setStepCounterRerenderer(game.getCurrentStep());
  };
  //calc(100vh - ${headerHeight} - ${footerHeight});
  return (
    <Layout>
      {game.players.length == 2 ? <ReadyCheck /> : ""}
      {game.winner && <GameoverPopup />}
      <GameBody>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <div style={{ width: "70%", height: "100%" }}>
            <GameHeaderWrapper>
              {game && game.playerIds[0] == gameState?.active_player && (
                <PlayerNameWrapperActive
                  style={{ backgroundColor: theme.colors.player1Color }}
                >
                  {joinedRoom !== null ? joinedRoom.player1 : ""}
                </PlayerNameWrapperActive>
              )}
              {game && game.playerIds[0] != gameState?.active_player && (
                <PlayerNameWrapperInactive>
                  {joinedRoom !== null ? joinedRoom.player1 : ""}
                </PlayerNameWrapperInactive>
              )}
              <PlayerNameWrapperInactive>VS</PlayerNameWrapperInactive>
              {game && game.playerIds[1] == gameState?.active_player && (
                <PlayerNameWrapperActive
                  style={{ backgroundColor: theme.colors.player2Color }}
                >
                  {joinedRoom !== null ? joinedRoom.player2 : ""}
                </PlayerNameWrapperActive>
              )}
              {game && game.playerIds[1] != gameState?.active_player && (
                <PlayerNameWrapperInactive>
                  {joinedRoom !== null ? joinedRoom.player2 : ""}
                </PlayerNameWrapperInactive>
              )}
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
                {game !== null ? game?.getCurrentStep() : "Not Started"}
              </ReplayButtonWrapperSingle>
              <ReplayButtonWrapperSingle onClick={advanceButtonClicked}>
                <ArrowRightButton></ArrowRightButton>
              </ReplayButtonWrapperSingle>
              <ReplayButtonWrapperSingle onClick={toLastStep}>
                <ArrowRightDangerButton></ArrowRightDangerButton>
              </ReplayButtonWrapperSingle>
              <div style={{ width: "30%", textAlign: "end" }}>
                <h3>Forth</h3>
              </div>
            </ReplayButtonWrapper>
          </div>
          <div
            css={`
              height: 100%;
            `}
          >
            <GameDetails
              gameDetails={joinedRoom !== null ? joinedRoom : gameRoom}
            />
            <Chat />
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
