import { Input } from "./components/Input";
import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { ChangeEvent, useContext, useState } from "react";
import { SettingsContainer } from "./components/GameSettings";
import { SelectGameMode } from "./components/Select";
import { Button, DisabledButton } from "./components/Button";
import {
  GameRoom,
  GameRoomItem,
  GameRoomList,
} from "./components/GameRoomList";
import { Modal } from "./components/Modal";
import { theme } from "../../theme";
import { authContext } from "../../context/AuthenticationContext";
import io from "socket.io-client";
import { useEffect } from "react";

const NewgameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

export const NewgamePage = () => {
  const [gameSelected, setGameSelected] = useState<GameRoom | null>(null);
  const { token } = useContext(authContext);
  const [websocket, updateWebsocket] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:4000/newgame", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    console.log("socket: " + socket.id);
  }, []);

  const gameRooms: GameRoom[] = [
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "2",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "3",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "4",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "5",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "6",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "7",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "8",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "9",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
  ];

  const joinAsPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let tokenDecoded = JSON.parse(atob(token!.split(".")[1]));
    await fetch(`/api/game/`, {
      body: JSON.stringify({
        player: tokenDecoded.id,
        joinmode: "player",
        id: { this: gameSelected?.id },
      }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
  };

  const joinAsGuest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let tokenDecoded = JSON.parse(atob(token!.split(".")[1]));
    await fetch(`/api/game/`, {
      body: JSON.stringify({
        player: tokenDecoded.id,
        joinmode: "guest",
        id: { this: gameSelected?.id },
      }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
  };

  return (
    <Layout>
      <NewgameBody>
        <h1 style={{ textAlign: "center", margin: 0 }}> New Game</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SettingsContainer />
          <div>
            <div style={{ textAlign: "center" }}>
              <h2> Game Room List </h2>
            </div>
            <div style={{ height: "500px", overflowY: "scroll" }}>
              <GameRoomList>
                {gameRooms.map((gameRoom) => (
                  <GameRoomItem
                    key={gameRoom.id}
                    onClick={() => {
                      for (let gameRoomElement of gameRooms) {
                        if (gameRoomElement.id == gameRoom.id) {
                          document.getElementById(
                            gameRoomElement.id
                          )!.style.backgroundColor = theme.colors.primary;
                          setGameSelected(gameRoom);
                        } else {
                          document.getElementById(
                            gameRoomElement.id
                          )!.style.backgroundColor =
                            theme.colors.backgroundColor;
                        }
                      }
                    }}
                    gameRoom={gameRoom}
                  />
                ))}
              </GameRoomList>
            </div>
            {gameSelected && (
              <div>
                <Button onClick={joinAsPlayer}>Join As Player</Button>
                <Button onClick={joinAsGuest}>Join As Guest</Button>
              </div>
            )}
            {!gameSelected && (
              <div>
                <DisabledButton>Join As Player</DisabledButton>
                <DisabledButton>Join As Guest</DisabledButton>
              </div>
            )}
          </div>
        </div>
      </NewgameBody>
    </Layout>
  );
};
