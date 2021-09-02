import {Input} from "./components/Input";
import styled from "styled-components";
import {footerHeight, headerHeight, Layout} from "../../components/Layout";
import React, {ChangeEvent, useContext, useState} from "react";
import {SettingsContainer, GameSettings} from "./components/GameSettings";
import {SelectGameMode} from "./components/Select";
import {Button, DisabledButton} from "./components/Button";
import {
    GameRoom,
    GameRoomItem,
    GameRoomList,
} from "./components/GameRoomList";
import {Modal} from "./components/Modal";
import {theme} from "../../theme";
import {authContext} from "../../context/AuthenticationContext";
import {GameDetails, GameDetailsEmpty} from "./components/GameDetails";

const NewgameBody = styled.div`
  border: 1px solid white;
  height: 100%;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 100%;
`;

export const NewgamePage = () => {
    const [gameSelected, setGameSelected] = useState<GameRoom | null>(null);
    const {token} = useContext(authContext);


    const gameRooms: GameRoom[] = [
        {
            id: "1",
            name: "Test Room Name",
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
        },
        {
            id: "2",
            name: "Test Room Name",
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
        },
        {
            id: "3",
            name: "Test Room Name",
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
        },
        {
            id: "4",
            name: "Test Room Name",
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
        },
        {
            id: "5",
            name: "Test Room Name",
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
        },
        {
            id: "6",
            name: "Test Room Name",
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
        },
        {
            id: "7",
            name: "Test Room Name",
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
        },
        {
            id: "8",
            name: "Test Room Name",
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
        },
        {
            id: "9",
            name: "Test Room Name",
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
        },
    ];

    const joinAsPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let tokenDecoded = JSON.parse(atob(token!.split(".")[1]));
        await fetch(`/api/game/`, {
            body: JSON.stringify({
                player: tokenDecoded.id,
                joinmode: "player",
                id: {this: gameSelected?.id},
            }),
            headers: {"Content-Type": "application/json"},
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
                id: {this: gameSelected?.id},
            }),
            headers: {"Content-Type": "application/json"},
            method: "PUT",
        });
    };

    return (
        <Layout>
            <NewgameBody>
                <h1 style={{textAlign: "center", margin: 0}}> New Game</h1>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <SettingsContainer/>
                    <div>
                        <div style={{textAlign: "center"}}>
                            <h2> Game Room List </h2>
                        </div>
                        <div style={{height: "450px", overflowY: "scroll"}}>
                            <GameRoomList>
                                {gameRooms.map((gameRoom) => (
                                    <GameRoomItem
                                        key={gameRoom.id}
                                        onClick={() => {

                                            for (let gameRoomElement of gameRooms) {
                                                if (gameRoomElement.id == gameRoom.id) {
                                                    document.getElementById(gameRoomElement.id)!.style.backgroundColor = theme.colors.primary;
                                                    setGameSelected(gameRoom);
                                                } else {
                                                    document.getElementById(gameRoomElement.id)!.style.backgroundColor = theme.colors.backgroundColor;
                                                }
                                            }
                                        }}
                                        gameRoom={gameRoom}
                                    />
                                ))}
                            </GameRoomList>
                        </div>
                        <Button>Refresh</Button>
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
                        <div>
                            <div style={{textAlign: "center"}}>
                                <h2> Game Room Details </h2>
                            </div>
                            <div style={{width: "400px", paddingLeft: "50px"}}>
                                {gameSelected && (
                                    <GameDetails gameDetails={gameSelected!}/>
                                )}
                                {!gameSelected && (
                                    <GameDetailsEmpty/>
                                )}
                            </div>
                        </div>
                </div>
            </NewgameBody>
        </Layout>
    );
};
