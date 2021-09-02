import React, {useState} from "react";
import styled from "styled-components";
import {GameSettings} from "./GameSettings";

export type GameRoom = {
  id: string;
  name: string;
  player1: string;
  player2: string;
  guests: string[];
  gameSetting: GameSettings;

};

const GameRoomFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const GameRoomHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const GameRoomItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  border-radius: 10px;
  &:hover {
    background-color: green;
  }
`;

export const GameRoomListLayout = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  margin: 10px;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
`;

export const GameRoomList = styled.ul`

  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  ${GameRoomItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const GameRoomId = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export const GameRoomTitle = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export const GameRoomPlayers = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export const GameRoomGuests = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
`;

export type GameRoomItemProps = {
  gameRoom: GameRoom;
  onClick?: (gameRoom: GameRoom) => void;
};

export const GameRoomItem: React.FC<GameRoomItemProps> = ({gameRoom, onClick = () => undefined}) => {


  const getGuests = (guests: string[]) => {
    var concatGuests = "";
    for (let guest of guests) {
      concatGuests += guest + " ";
    }
    return concatGuests;
  };

  const { id, name, player1, player2, guests } = gameRoom;
  return (
    <div id={id}
      style={{
        width: "100%",
        textAlign: "left",
//        backgroundColor: isClicked ? "rgb(54,161,139)" : "",
      }}
    >
      <GameRoomItemStyle
        data-testid="joke-item"
        onClick={() => {
          onClick(gameRoom);

        }}
      >
        <GameRoomHighlight />
        <GameRoomFlex>
          <div>
            <GameRoomTitle>
              <b>Name: </b>
              {name}
            </GameRoomTitle>
            <GameRoomPlayers>
              <b>Current Players: </b>
              {player1}, {player2}
            </GameRoomPlayers>
            <GameRoomGuests>
              <b>Current Guests: </b>
              {getGuests(guests)}
            </GameRoomGuests>
          </div>
        </GameRoomFlex>
      </GameRoomItemStyle>
    </div>
  );
};
