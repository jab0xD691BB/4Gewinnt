import {StyledField} from "./Field";
import React from "react";
import {Game} from "./GameEngine";
import styled from "styled-components";
import {FieldColumn} from "./Column";

const game = new Game(20, 15, 8);

export const GameBoardWrapper = styled.div`
  margin: 10px;
  overflowY: scroll;
  padding: 10px;
  `;

export const GameBoard = () => {
    let columnId = 0;
    return <div id="game_board" style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }}>
        {game.gameBoard.map((column) => {
            console.log(columnId);
            let rowId = 0;
            return <FieldColumn id={"column_" + columnId++}> {column.map((element) => {
                return <StyledField id={"row_" + rowId++} style={{padding: `min(calc(700px/(2*${game.boardWidth})), calc(500px/(2*${game.boardHeight})))`}}/>;
            })}
            </FieldColumn>
        })}
    </div>;
}