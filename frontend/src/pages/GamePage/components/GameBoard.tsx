import { StyledField } from "./Field";
import React from "react";
import { Game, GameStateEnum, GameStep } from "./GameEngine";
import styled from "styled-components";
import { FieldColumn } from "./Column";
import { theme } from "../../../theme";

export const game = new Game(20, 15, 10);
game.addPlayer("test1_yello", "Wurstkönig", "#999926", 10000000000);
game.addPlayer("test2_purp", "Käsepeter", "#996299", 10000000000);
game.addPlayer("test3_blu", "Brotfinger", "#269999", 1000000000);
//game.addPlayer("test4_gra", "Brotfinger", "#969992", 1000000000);
//game.addPlayer("test5_gren", "Brotfinger", "#299969", 1000000000);
//game.addPlayer("test3_ree", "Brotfinger", "#924469", 1000000000);
game.startGame();
game.cyclePlayer();

export const GameBoardWrapper = styled.div`
  margin: 10px;
  overflowy: scroll;
  padding: 10px;
`;

export const GameBoard = () => {
  let columnId = -1;
  return (
    <div
      id="game_board"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {game.gameBoard.map((column) => {
        let rowId = -1;
        return (
          <FieldColumn id={"column_" + ++columnId} onClick={columnClicked}>
            {" "}
            {column.map((element) => {
              return (
                <StyledField
                  id={"column_" + columnId + ".row_" + ++rowId}
                  style={{
                    padding: `min(calc(700px/(2*${game.boardWidth})), calc(500px/(2*${game.boardHeight})))`,
                  }}
                />
              );
            })}
          </FieldColumn>
        );
      })}
    </div>
  );
};

const columnClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
  if (game.activeStep !== undefined) {
    reRenderBoard();
  }
  let column_number = parseInt(e.currentTarget.id.split("_")[1]);
  //TODO: give player_id of logged in player instead
  let step: GameStep | undefined = game.insert(
    column_number,
    game.activePlayer
  );
  if (step) {
    colorField(step.x, step.y, step.color, step.color);
  }
  checkGameState();
};

const reRenderBoard = function (simple: boolean = true) {
  let game_steps = game.gameSteps;

  if (simple) {
    game_steps.slice(1).forEach((step) => {
      colorField(step.x, step.y, step.color, step.color);
    });
  } else {
    let game_board = game.gameBoard;

    for (let x: number = 0; x < game_board.length; x++) {
      for (let y: number = 0; y < game_board[x].length; y++) {
        colorField(
          x,
          y,
          game_steps[game_board[x][y]].color,
          game_board[x][y] === 0
            ? theme.colors.fontColor
            : game_steps[game_board[x][y]].color
        );
      }
    }
  }
};

export const reverseButtonClicked = async (
  e: React.MouseEvent<HTMLDivElement>
) => {
  let last_to_draw = game.reverseStep();
  if (last_to_draw === undefined) {
    return;
  }
  let step = game.gameSteps[last_to_draw + 1];
  colorField(step.x, step.y, theme.colors.fullyTransparentColor);
};

export const advanceButtonClicked = async (
  e: React.MouseEvent<HTMLDivElement>
) => {
  let last_to_draw = game.advanceStep();
  if (last_to_draw === undefined) {
    return;
  }
  let step = game.gameSteps[last_to_draw];
  colorField(step.x, step.y, step.color);
};

export const resign = async (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("loser: " + game.activePlayer);
  game.resignPlayer(
    //TODO: Spieler ID angeben
    game.activePlayer
  );
  checkGameState();
};

const colorField = function (
  x: number,
  y: number,
  bg_color: string,
  border_color?: string
) {
  document.getElementById(
    "column_" + x + ".row_" + (game.boardHeight - 1 - y)
  )!.style.backgroundColor = bg_color;
  if (border_color !== undefined) {
    document.getElementById(
      "column_" + x + ".row_" + (game.boardHeight - 1 - y)
    )!.style.borderColor = border_color;
  }
};

const checkGameState = function () {
  //TODO: Implement response
  if (game.gameState !== GameStateEnum.IN_PROGRESS) {
    console.log("gamestate " + game.gameState);
    if (game.gameState === GameStateEnum.HAS_WINNER) {
      console.log("winner id" + game.winner);
    }
  }
};
