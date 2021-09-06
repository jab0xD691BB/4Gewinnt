import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import {
  Game,
  GameState,
  GameStateEnum,
  GameStep,
  Player,
  PlayerStateEnum,
} from "../pages/GamePage/components/GameEngine";
import { GameRoom } from "../pages/NewgamePage/components/GameRoomList";
import { authContext } from "./AuthenticationContext";
import { game, reRenderBoard } from "../pages/GamePage/components/GameBoard";

const socket = io();

interface SocketContext {
  socket: Socket;
  joinedRoom: GameRoom | null;
  rooms: GameRoom[];
  gameState: GameState | null;
  setJoinedRoom: (g: GameRoom) => void;
  setGameStateFromGameBoard: (gs: GameState) => void;
}

export const SocketContext = React.createContext<SocketContext>({
  socket,
  joinedRoom: null,
  rooms: [],
  gameState: {
    connect: 4,
    winner: "undefined",
    active_player: "undefined",
    active_player_state: PlayerStateEnum.ACTIVE,
    active_start: new Date().getTime(),
    players: new Map<string, Player>(),
    state: GameStateEnum.NOT_STARTED,
    steps: new Array<GameStep>(),
    date: new Date(),
  },
  setJoinedRoom: (g: GameRoom) => {},
  setGameStateFromGameBoard: (gs: GameState) => {},
});

export const SocketProvider: React.FC = ({ children }) => {
  const [joinedRoom, setJoinRoom] = useState<GameRoom | null>(null);
  const [rooms, setRooms] = useState<GameRoom[]>([]);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const { token } = useContext(authContext);
  const tokenName =
    token != null ? JSON.parse(atob(token!.split(".")[1])).name : "";

  console.log("rooms ", rooms);
  console.log("joinRoom ", joinedRoom);
  console.log("gameState ", gameState);

  useEffect(() => {
    socket.on("joinNewPage", (message: any) => {
      const g: GameRoom[] = message.settings;

      g.length != 0 && setRooms(g);

      g.map((item: GameRoom) => {
        if (item.name === tokenName) {
          setJoinRoom(item);
        }
      });

      setGameState(null);
    });

    socket.on("createroom", (message: any) => {
      if (Object.keys(message).length !== 0) {
        const r: GameRoom = message.settings;

        //setJoinRoom(r);
      }
    });

    socket.on("joinedRoom", (message: any) => {
      if (Object.keys(message).length !== 0) {
        const r: GameRoom = message.settings;

        setJoinRoom(r);
      }
    });
    socket.on("player2join", (message: any) => {
      console.log("some one joined", message);
      if (Object.keys(message).length !== 0) {
        const r: GameRoom = message.settings;

        setJoinRoom(r);

      }
    });

    socket.on("refreshRoom", (message: any) => {
      const g: GameRoom[] = message.settings;
      setRooms(g);
    });

    socket.on("refreshGameState", (message: any) => {
      const newGameState: GameState = message.gameState.gameState;
      const playerValuesAsArray: any[] = message.gameState.playerValuesAsArray;
      const playerIdsAsArray: any[] = message.gameState.playerIdsAsArray;
      newGameState.players = new Map<string, Player>();

      for (let i = 0; i < playerValuesAsArray.length; i++) {
        newGameState.players.set(playerIdsAsArray[i], playerValuesAsArray[i]);
      }
      game.setGame(newGameState);

      setGameState(newGameState)
      reRenderBoard();
      console.log("refresh state ", newGameState);
      if (newGameState.state === 3) {
//        setGameState(null);
      }
    });

    socket.on("deleteroom", (message: any) => {
      console.log("delete received ", message);

      setRooms(message.settings);
      setJoinRoom(null);
    });
  }, []);

  const setJoinedRoom = (g: GameRoom) => {
    setJoinRoom(g);
  };

  const setGameStateFromGameBoard = (gs: GameState) => {
    setGameState(gs);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinedRoom,
        rooms,
        gameState,
        setJoinedRoom,
        setGameStateFromGameBoard,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
