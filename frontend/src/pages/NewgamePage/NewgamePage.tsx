import { Input } from "./components/Input";
import styled from "styled-components";

import { useEffect } from "react";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { ChangeEvent, useContext, useState } from "react";
import { SettingsContainer, GameSettings } from "./components/GameSettings";
import { Button, DisabledButton } from "./components/Button";
import {
  GameRoom,
  GameRoomItem,
  GameRoomList,
  GameRoomListLayout,
} from "./components/GameRoomList";
import { authContext } from "../../context/AuthenticationContext";
import { GameDetails, GameDetailsEmpty } from "./components/GameDetails";
import { SocketContext } from "../../context/socket.context";
import { useHistory } from "react-router";
import { game } from "../GamePage/GamePage";

const NewgameBody = styled.div`
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

interface setting {
  boardHeigth: string;
  boardWidth: string;
  rated: string;
  rowCountToWin: string;
  time: string;
}

interface room {
  name: string;
  setting: setting;
}

export const NewgamePage = () => {
  const [gameSelected, setGameSelected] = useState<GameRoom | null>(null);
  const { token } = useContext(authContext);
  const { socket, rooms, setJoinedRoom } = useContext(SocketContext);
  let history = useHistory();

  const [websocket, updateWebsocket] = useState(false);
  const [ws, setSocket] = useState();
  /*const [rooms, setRooms] = useState<
    Array<{
      key: string;
      value: GameRoom;
    }>
  >([]);*/

  useEffect(() => {
    socket.emit("connectplayer", {
      name: JSON.parse(atob(token!.split(".")[1])).name,
    });
    function receive() {}
    receive();
  }, []);

  const joinAsPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (game) game.suspendGame();
    socket.emit("joinedRoom", {
      roomName: gameSelected?.id,
      myName: JSON.parse(atob(token!.split(".")[1])).name,
    });

    let gameRoom = rooms.find((x) => x.id === gameSelected?.id);
    gameRoom!.player2 = JSON.parse(atob(token!.split(".")[1])).name;

    setJoinedRoom(gameRoom!);

    history.push("/game");
  };

  const joinAsGuest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (game) game.suspendGame();
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
          <SettingsContainer ws={socket} />
          <GameRoomListLayout>
            <h2> Game Room List </h2>
            <GameRoomList>
              <div
                style={{
                  height: "450px",
                  overflowY: "scroll",
                  borderRadius: "10px",
                }}
              >
                {rooms.map((gameRoom) => (
                  <GameRoomItem
                    key={gameRoom.id}
                    onClick={() => {
                      for (let gameRoomElement of rooms) {
                        if (gameRoomElement.id == gameRoom.id) {
                          document.getElementById(
                            gameRoomElement.id
                          )!.style.backgroundColor = "green";
                          document.getElementById(
                            gameRoomElement.id
                          )!.style.borderRadius = "10px";
                          setGameSelected(gameRoom);
                        } else {
                          document.getElementById(
                            gameRoomElement.id
                          )!.style.backgroundColor = "#2b2b2b";
                        }
                      }
                    }}
                    gameRoom={gameRoom}
                  />
                ))}
              </div>
            </GameRoomList>
            <div style={{ alignSelf: "flex-end" }}>
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
          </GameRoomListLayout>
          {gameSelected && <GameDetails gameDetails={gameSelected!} />}
          {!gameSelected && <GameDetailsEmpty />}
        </div>
      </NewgameBody>
    </Layout>
  );
};
