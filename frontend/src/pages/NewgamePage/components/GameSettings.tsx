import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { Input, InputCheckbox } from "./Input";
import { Button, DangerButton } from "../../../components/Button";
import { GameRoom } from "./GameRoomList";
import io, { Socket } from "socket.io-client";
import { authContext } from "../../../context/AuthenticationContext";
import { SocketContext } from "../../../context/socket.context";
import { useHistory } from "react-router";
import { game } from "../../GamePage/GamePage";
import { ComponentHeadline } from "../NewgamePage";

export type GameSettings = {
  boardWidth: string;
  boardHeigth: string;
  rowCountToWin: string;
  time: string;
};

export const GameSettingsLayout = styled.div`
  background-color: ${(props) => props.theme.colors.boardColor};
  border-radius: 10px;
  width: 30%;
`;

interface props {
  ws: Socket;
}

export const SettingsContainer: React.FC<props> = ({ ws }) => {
  const [values, setValues] = useState({
    boardWidth: "6",
    boardHeigth: "7",
    rowCountToWin: "4",
    time: "10",
    rated: "false",
  });

  const [sessionStarted, setSessionStarted] = useState<boolean>(false);
  const { token } = useContext(authContext);
  const { socket, rooms, joinedRoom, setJoinedRoom } =
    useContext(SocketContext);
  let history = useHistory();

  const fieldDidChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const fieldDidChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createGameSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const gameSetting: GameSettings = values;

    const gameRoom: GameRoom = {
      id: JSON.parse(atob(token!.split(".")[1])).name,
      name: JSON.parse(atob(token!.split(".")[1])).name,
      player1: {
        id: JSON.parse(atob(token!.split(".")[1])).id,
        name: JSON.parse(atob(token!.split(".")[1])).name,
        eloScore: Number(JSON.parse(atob(token!.split(".")[1])).eloScore),
        ready: false,
      },
      player2: { id: "", name: "", eloScore: 0, ready: false },
      guests: [],
      gameSetting: gameSetting,
    };
    /*await fetch("/api/match", {
      body: JSON.stringify({
        ...values,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });*/

    if (game) game.suspendGame();

    socket.emit("createroom", gameRoom);
    setSessionStarted(true);
    setJoinedRoom(gameRoom);
    history.push("/game");
  };

  const deleteGameSession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const gameSetting: GameSettings = values;

    const gameRoom: GameRoom = {
      id: JSON.parse(atob(token!.split(".")[1])).name,
      name: JSON.parse(atob(token!.split(".")[1])).name,
      player1: {
        id: JSON.parse(atob(token!.split(".")[1])).id,
        name: JSON.parse(atob(token!.split(".")[1])).name,
        eloScore: Number(JSON.parse(atob(token!.split(".")[1])).eloScore),
        ready: false,
      },
      player2: { id: "", name: "", eloScore: 0, ready: false },
      guests: [],
      gameSetting: gameSetting,
    };

    socket.emit("deleteroom", gameRoom);
    setSessionStarted(false);
  };

  return (
    <GameSettingsLayout>
      <div
        style={{
          width: 400,
          paddingLeft: 50,
          paddingRight: 50,
          textAlign: "center",
        }}
      >
        <ComponentHeadline> Settings </ComponentHeadline>
        <Input
          name="boardWidth"
          label="Board Width"
          type="number"
          step="1.00"
          min="1"
          max="10"
          onChange={fieldDidChangeInput}
          required
          defaultValue="7"
        />
        <Input
          name="boardHeigth"
          label="Board Heigth"
          type="number"
          step="1.00"
          min="5"
          max="10"
          onChange={fieldDidChangeInput}
          required
          defaultValue="6"
        />
        <Input
          name="rowCountToWin"
          label="Row Count to win"
          type="number"
          step="1.00"
          min="4"
          max="10"
          onChange={fieldDidChangeInput}
          required
          defaultValue="4"
        />
        <Input
          name="time"
          label="Time in Minutes"
          type="number"
          step="1.00"
          min="1"
          max="60"
          onChange={fieldDidChangeInput}
          required
          defaultValue="10"
        />
        {joinedRoom?.id !== JSON.parse(atob(token!.split(".")[1])).name && (
          <Button onClick={createGameSession}>Create Game Session</Button>
        )}
        {joinedRoom?.id === JSON.parse(atob(token!.split(".")[1])).name && (
          <DangerButton onClick={deleteGameSession}>
            Delete Game Session
          </DangerButton>
        )}
      </div>
    </GameSettingsLayout>
  );
};
