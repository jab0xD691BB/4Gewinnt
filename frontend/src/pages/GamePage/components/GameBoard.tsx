import {Field} from "./Field";
import React from "react";
import {Game} from "./GameEngine";
import styled from "styled-components";

const game = new Game();

export const GameBoardWrapper = styled.div`
  margin: 10px;
  overflowY: scroll;
  padding: 10px;
  `;

export const GameBoard = () => {
    return <div style={{
        backgroundColor: "rgb(160,0,0)",
        width: "100%",
        height: "550px",
        display: "flex",
        flexDirection: "row",
    }}>
        {game.gameBoard.map((column) => {
            return <div style={{
                backgroundColor: "rgb(160,0,100)",
                width: "100%",
                height: "550px",
                display: "flex",
                flexDirection: "column",
            }}> {column.map((element) => {
                return <Field></Field>;
            })}
            </div>
        })}
    </div>;
}