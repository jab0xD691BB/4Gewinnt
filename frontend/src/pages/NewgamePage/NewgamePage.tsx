import { Input } from "./components/Input";
import styled from "styled-components";

import { useEffect } from "react";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import React, { ChangeEvent, useContext, useState } from "react";
import { SettingsContainer, GameSettings } from "./components/GameSettings";
import { SelectGameMode } from "./components/Select";
import { Button, DisabledButton } from "./components/Button";
import {
  GameRoom,
  GameRoomItem,
  GameRoomList,
  GameRoomListLayout,
} from "./components/GameRoomList";
import { Modal } from "./components/Modal";
import { theme } from "../../theme";
import { authContext } from "../../context/AuthenticationContext";
import { GameDetails, GameDetailsEmpty } from "./components/GameDetails";
import { socket } from "../../context/socket.context";

const NewgameBody = styled.div`
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

interface setting {
  bestOf: string;
  boardHeigth: string;
  boardWidth: string;
  gameMode: string;
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
  const [websocket, updateWebsocket] = useState(false);
  const [ws, setSocket] = useState();
  const [rooms, setRooms] = useState<
    Array<{
      key: string;
      value: GameRoom;
    }>
  >([]);

  useEffect(() => {
    function receive() {
      socket.emit("connectplayer", {
        name: JSON.parse(atob(token!.split(".")[1])).name,
      });
      socket.on("joinNewPage", (message: any) => {
        console.log("new page:", message);
        const msg = message[0];
        console.log(message);
        if (Object.keys(message).length !== 0) {
          message.settings.map((value: any) => {
            const r: GameRoom = value;

            setRooms((rooms) => [...rooms, { key: r.name, value: r }]);
          });
        }
      });

      socket.on("createroom", (message: any) => {
        console.log("create received", message);

        if (Object.keys(message).length !== 0) {
          const r: GameRoom = message.settings;

          setRooms((rooms) => [...rooms, { key: r.name, value: r }]);
        }
      });

      socket.on("deleteroom", (message: any) => {
        console.log("delete received ", message);

        if (Object.keys(message).length !== 0) {
          const r: GameRoom[] = message.settings;
          let newRooms = new Array<{
            key: string;
            value: GameRoom;
          }>();
          for(let entry of r){
            newRooms.push({key: entry.name, value: entry})
          }
          setRooms(newRooms);
        }
      });
    }
    receive();
  }, []);
  console.log("rooms ", rooms);

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
                    key={gameRoom.value.id}
                    onClick={() => {
                      for (let gameRoomElement of rooms) {
                        if (gameRoomElement.value.id == gameRoom.value.id) {
                          document.getElementById(
                            gameRoomElement.value.id
                          )!.style.backgroundColor = "green";
                          document.getElementById(
                            gameRoomElement.value.id
                          )!.style.borderRadius = "10px";
                          setGameSelected(gameRoom.value);
                        } else {
                          document.getElementById(
                            gameRoomElement.value.id
                          )!.style.backgroundColor = "#2b2b2b";
                        }
                      }
                    }}
                    gameRoom={gameRoom.value}
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
