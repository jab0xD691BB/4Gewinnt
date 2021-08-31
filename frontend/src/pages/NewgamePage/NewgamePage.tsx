import { Input } from "./components/Input";
import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { ChangeEvent, useState } from "react";
import { SettingsContainer } from "./components/GameSettings";
import { SelectGameMode } from "./components/Select";
import { Button } from "./components/Button";
import {
  GameRoom,
  GameRoomItem,
  GameRoomList,
} from "./components/GameRoomList";
import { Modal } from "./components/Modal";

const NewgameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

export const NewgamePage = () => {
  const [joinGameVisible, setJoinGameVisible] = useState(false);

  const gameRooms: GameRoom[] = [
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
    {
      id: "1",
      name: "Test Room Name",
      player1: "IchMachDichPlatt",
      player2: "IchDichAuch",
      guests: ["Gast1", "Gast2"],
    },
  ];

  const createGameSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/joke/`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
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
                      if (!joinGameVisible) {
                        setJoinGameVisible(true);
                      }
                    }}
                    gameRoom={gameRoom}
                  />
                ))}
              </GameRoomList>
            </div>
          </div>
          {joinGameVisible && (
            <div>
              <Modal
                title="Join Game"
                onCancel={() => {
                  setJoinGameVisible(false);
                }}
              >
                <div>
                  <Button>Join As Player</Button>
                  <Button>Join As Guest</Button>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </NewgameBody>
    </Layout>
  );
};
