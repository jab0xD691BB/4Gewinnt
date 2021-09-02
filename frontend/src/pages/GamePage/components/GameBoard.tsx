import {Field, StyledField} from "./Field";
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }}>
        {game.gameBoard.map((column) => {
            return <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

            }}> {column.map((element) => {
                return <StyledField style={{padding: `min(calc(700px/(2*${game.boardWidth})), calc(500px/(2*${game.boardHeight})))`}}/>;
            })}
            </div>
        })}
    </div>;
}