import styled from "styled-components";
import {footerHeight, headerHeight, Layout} from "../../components/Layout";
import React, {ChangeEvent, useContext, useState} from "react";
import {GameBoard, GameBoardWrapper} from "./components/GameBoard";

import {
    ArrowLeftButton, ArrowRightButton,
    ReplayButtonWrapper, ReplayButtonWrapperSingle
} from "./components/ReplayButtons";

import {
    GameHeaderWrapper, GameHeaderWrapperSingle
} from "./components/GameHeader";

import {GameRoom, GameRoomItem} from "../NewgamePage/components/GameRoomList";
import {GameDetails} from "./components/GameDetails";
import {Button, VerticalButtonWrapper} from "./components/Button";

const GameBody = styled.div`
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

const gameRoom: GameRoom =
    {
        id: "1",
        name: "Test Room Name1",
        player1: "IchMachDichPlatt",
        player2: "IchDichAuch",
        guests: ["Gast1", "Gast2"],
        gameSetting: {
            boardWidth: "7",
            boardHeigth: "7",
            bestOf: "7",
            gameMode: "human",
            rated: "on",
            rowCountToWin: "4",
            time: "7"
        }
    }


export const GamePage = () => {

    const leftArrowButtonClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
        //TODO: one move back;
    }

    const rightArrowButtonClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
        //TODO: one move forth;
    }

    return (
        <Layout>
            <GameBody>
                <div
                    style={{display: "flex", flexDirection: "row", height: "800px"}}>
                    <div style={{width: "70%", height: "100%",}}>
                        <GameHeaderWrapper>
                            <GameHeaderWrapperSingle>
                                {gameRoom.player1}
                            </GameHeaderWrapperSingle>
                            <GameHeaderWrapperSingle>
                                VS
                            </GameHeaderWrapperSingle>
                            <GameHeaderWrapperSingle>
                                {gameRoom.player2}
                            </GameHeaderWrapperSingle>
                        </GameHeaderWrapper>
                        <GameBoardWrapper>
                            <GameBoard/>
                        </GameBoardWrapper>
                        <ReplayButtonWrapper>
                            <div style={{width: "30%"}}>
                                <h3>Back</h3>
                            </div>
                            <ReplayButtonWrapperSingle onClick={leftArrowButtonClicked}>
                                <ArrowLeftButton>
                                </ArrowLeftButton>
                            </ReplayButtonWrapperSingle>
                            <ReplayButtonWrapperSingle onClick={rightArrowButtonClicked}>
                                <ArrowRightButton>
                                </ArrowRightButton>
                            </ReplayButtonWrapperSingle>
                            <div style={{width: "30%", textAlign: "end"}}>
                                <h3>Forth</h3>
                            </div>
                        </ReplayButtonWrapper>
                    </div>
                    <div>
                        <GameDetails gameDetails={gameRoom}/>
                        <VerticalButtonWrapper>
                            <Button>
                                Resign
                            </Button>
                            <Button>
                                Back to Dashboard
                            </Button>
                        </VerticalButtonWrapper>
                    </div>
                </div>
            </GameBody>
        </Layout>
    );
};
